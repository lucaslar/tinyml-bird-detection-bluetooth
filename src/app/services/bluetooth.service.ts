/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BirdCharacteristic } from '../model/bird-characteristic';
import { ConnectionState } from '../model/connection-state.enum';
import { ErrorState } from '../model/error-state.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDisconnectionComponent } from '../components/dialogs/confirm-disconnection/confirm-disconnection.component';

/**
 * Service containing the logic for managing Bluetooth devices, i.e. connecting, disconnecting and reading values.
 */
@Injectable({
    providedIn: 'root',
})
export class BluetoothService {
    /**
     * Current connection state.
     */
    connectionState: ConnectionState = ConnectionState.Ready;

    /**
     * Current error state (undefined in case of no errors)
     */
    errorState: ErrorState;

    /**
     * True if at the moment, a device is being connected, false if not.
     */
    isConnecting: boolean;

    /**
     * True if Bluetooth is supported by the web browser, false if not.
     */
    readonly isSupported = !!navigator.bluetooth;

    /**
     * UUID of the GATT service this application communicates with-
     */
    readonly service = 'e50bf554-fdd9-4d9e-b350-86493ab13280';

    /**
     * List of all available/connected bird characteristics.
     */
    readonly birdCharacteristics = BirdCharacteristic.characteristics;

    /**
     * Currently connected Bluetooth device or undefined in case of no connection.
     * @private
     */
    private device: BluetoothDevice;

    /**
     * Function to be called on GATT disconnection.
     */
    private readonly gattDisconnectedFn = () => this.onDisconnected();

    /**
     * @param snackbar Injected snackbar service
     * @param translate Injected translation service
     * @param dialog Injected dialog service
     */
    constructor(
        private readonly snackbar: MatSnackBar,
        private readonly translate: TranslateService,
        private readonly dialog: MatDialog
    ) {}

    /**
     * Connects a device in case of no current connection or disconnects it if already connected.
     */
    onBluetoothPressed(): void {
        this.isDeviceConnected ? this.disconnect() : this.connect();
    }

    /**
     * @returns Current bluetooth state: 'bluetooth_disabled' if {{ isSupported }} is not true,
     * otherwise 'bluetooth_searching' if connecting or 'bluetooth'/'bluetooth_connected' based on the
     * connection state.
     */
    get currentBluetoothState(): string {
        if (this.isSupported) {
            if (this.isConnecting) {
                return 'bluetooth_searching';
            } else {
                return this.isDeviceConnected
                    ? 'bluetooth_connected'
                    : 'bluetooth';
            }
        } else {
            return 'bluetooth_disabled';
        }
    }

    /**
     * @returns True if the device is connected, false if not.
     */
    get isDeviceConnected(): boolean {
        return !this.isConnecting && this.device?.gatt.connected;
    }

    /**
     * @returns name of the currently connected device/undefined in case of no connection.
     */
    get deviceName(): string {
        return this.device?.name;
    }

    /**
     * Connects to a Bluetooth device with the following steps:
     * - request (user action is necessary)
     * - connect to GATT service
     * - access characteristics
     * - listen to characteristics
     *
     * Any occurring error is caught and centrally handled.
     *
     * @private
     */
    private connect(): void {
        delete this.errorState;
        this.connectionState = ConnectionState.Searching;
        navigator.bluetooth
            .requestDevice({ filters: [{ services: [this.service] }] })
            .then((device) => this.onDeviceFound(device))
            .then((server) => server.getPrimaryService(this.service))
            .then((service) => service.getCharacteristics())
            .then((cc) => this.listenToAllCharacteristics(cc))
            .catch((error: Error) => this.handleError(error));
    }

    /**
     * Opens a dialog for confirming disconnecting from the currently connected device.
     * If confirmed and - in order to avoid errors - the GATT is still connected, its is disconnected.
     * @private
     */
    private disconnect(): void {
        if (this.isDeviceConnected) {
            this.dialog
                .open(ConfirmDisconnectionComponent, { data: this.deviceName })
                .afterClosed()
                .subscribe((disconnect) => {
                    if (disconnect && this.isDeviceConnected) {
                        this.device.gatt.disconnect();
                    }
                });
        }
    }

    /**
     * Connects to a device's GATT server and adds a listener to be called on disconnecting after
     * having established the connection. Also, {{ connectionState }} and {{ isConnecting }} are
     * set accordingly.
     *
     * @param device Bluetooth device to be connected
     * @returns Promise of established connection.
     *
     * @private
     */
    private onDeviceFound(
        device: BluetoothDevice
    ): Promise<BluetoothRemoteGATTServer> {
        this.connectionState = ConnectionState.ConnectingGatt;
        const connection = device.gatt.connect();
        this.isConnecting = true;
        connection
            .then(() => {
                this.device = device;
                this.device.addEventListener(
                    'gattserverdisconnected',
                    this.gattDisconnectedFn
                );
            })
            .catch((error: Error) => this.handleError(error));
        return connection;
    }

    /**
     * Disconnects from the current device, removes its disconnection listener and deletes the
     * reference. Also, {{ connectionState }} and {{ isConnecting }} are set accordingly, a
     * potential error state is deleted and `isReady` is set to false for each bird characteristic.
     * After disconnecting, a snackbar is shown in order to inform the user.
     *
     * @private
     */
    private onDisconnected(): void {
        this.connectionState = ConnectionState.Ready;
        delete this.errorState;
        this.isConnecting = false;

        const deviceName = this.device?.name;
        this.device?.removeEventListener(
            'gattserverdisconnected',
            this.gattDisconnectedFn
        );
        delete this.device;
        this.birdCharacteristics.forEach((bc) => (bc.isReady = false));

        const [keyChanged, keyClose] = [
            deviceName
                ? 'bluetooth.snackbar.disconnected'
                : 'bluetooth.snackbar.disconnectedDefault',
            'general.close',
        ];
        this.translate
            .get([keyChanged, keyClose], { device: deviceName })
            .subscribe((r) => {
                this.snackbar.open(r[keyChanged], r[keyClose], {
                    duration: 3000,
                });
            });
    }

    /**
     * Iterates over all characteristics from the given list and connects to each characteristic
     * found in the list of characteristics. I.e. starts notifications and initializes listening
     * to them. Also, {{ connectionState }} is set accordingly.
     *
     * @param characteristics List of available Bluetooth characteristics from a connected device.
     * @private
     */
    private listenToAllCharacteristics(
        characteristics: BluetoothRemoteGATTCharacteristic[]
    ): void {
        this.connectionState = ConnectionState.ConnectingCharacteristics;
        let queue = Promise.resolve();
        characteristics.forEach((characteristic) => {
            const birdCharacteristic = this.birdCharacteristics.find(
                (bc) => bc.uuid === characteristic.uuid
            );
            if (birdCharacteristic) {
                queue = queue
                    .then(() => {
                        return characteristic
                            .startNotifications()
                            .then((c) => {
                                this.listenToSpecificCharacteristic(
                                    c,
                                    birdCharacteristic
                                );
                            })
                            .catch((error: Error) => this.handleError(error));
                    })
                    .catch((error: Error) => this.handleError(error));
            }
        });
    }

    /**
     * Listens to a given characteristic, adds a listener to the given Bluetooth
     * characteristic and sets the respective characteristic's client side representation's
     * value on changes.
     *
     * @param characteristic Characteristic to be listened to.
     * @param birdCharacteristic Client side representation of the given characteristic.
     * @private
     */
    private listenToSpecificCharacteristic(
        characteristic: BluetoothRemoteGATTCharacteristic,
        birdCharacteristic: BirdCharacteristic
    ): void {
        birdCharacteristic.isReady = true;
        characteristic.addEventListener(
            'characteristicvaluechanged',
            (event) =>
                (birdCharacteristic.value =
                    (event.target as any).value.getUint8(0) / 255)
        );
        this.isConnecting = this.birdCharacteristics.some((bc) => !bc.isReady);
    }

    /**
     * Function for centrally handling Bluetooth errors. Prevented thrown errors:
     * - Bluetooth API disabled: Only set error state and set boolean
     *   indicating connecting to false instead
     * - Request device chooser cancelled: Do nothing instead
     *
     * Other errors are thrown, a generic error state is set and the boolean indicating
     * connecting is set to false.
     *
     * @param error Error to be handled.
     * @private
     */
    private handleError(error: Error): void {
        if (
            error instanceof DOMException &&
            error?.message === 'Web Bluetooth API globally disabled.'
        ) {
            this.setErrorState(ErrorState.API_DISABLED);
        } else if (
            error instanceof DOMException &&
            error?.message === 'User cancelled the requestDevice() chooser.'
        ) {
            this.connectionState = ConnectionState.Ready;
        } else {
            this.setErrorState(ErrorState.OTHER);
            throw error;
        }
    }

    /**
     * Sets an error state and sets boolean inidicating connecting to false.
     * @param error Error to be handled.
     * @private
     */
    private setErrorState(error: ErrorState): void {
        this.isConnecting = false;
        this.errorState = error;
    }
}
