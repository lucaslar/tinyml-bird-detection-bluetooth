/// <reference types="web-bluetooth" />

import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BirdCharacteristic } from '../model/bird-characteristic';
import { ConnectionState } from '../model/connection-state.enum';
import { ErrorState } from '../model/error-state.enum';

@Injectable({
    providedIn: 'root',
})
export class BluetoothService {
    // TODO: Add doc.

    connectionState: ConnectionState = ConnectionState.Ready;
    errorState: ErrorState;

    isConnecting: boolean;
    readonly isSupported = !!navigator.bluetooth;
    readonly service = 'e50bf554-fdd9-4d9e-b350-86493ab13280';

    readonly birdCharacteristics = BirdCharacteristic.characteristics;

    private device: BluetoothDevice;

    private readonly gattDisconnectedFn = () => this.onDisconnected();

    constructor(
        private readonly snackbar: MatSnackBar,
        private readonly translate: TranslateService
    ) {}

    onBluetoothPressed(): void {
        this.isDeviceConnected ? this.disconnect() : this.connect();
    }

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

    get isDeviceConnected(): boolean {
        return !this.isConnecting && this.device?.gatt.connected;
    }

    get deviceName(): string {
        return this.device?.name;
    }

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

    private disconnect(): void {
        if (
            this.isDeviceConnected &&
            // TODO: Improve dialog
            confirm('Are you sure you want to disconnect?')
        ) {
            this.device.gatt.disconnect();
        }
    }

    private onDeviceFound(device: BluetoothDevice): any {
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

    private listenToAllCharacteristics(
        characteristics: BluetoothRemoteGATTCharacteristic[]
    ): void {
        this.connectionState = ConnectionState.ConnectingCharacteristics;
        let queue = Promise.resolve();
        characteristics.forEach((characteristic) => {
            if (
                this.birdCharacteristics.some(
                    (bc) => bc.uuid === characteristic.uuid
                )
            ) {
                queue = queue
                    .then(() => {
                        return characteristic
                            .startNotifications()
                            .then((c) => {
                                this.listenToSpecificCharacteristic(c, c.uuid);
                            })
                            .catch((error: Error) => this.handleError(error));
                    })
                    .catch((error: Error) => this.handleError(error));
            }
        });
    }

    private listenToSpecificCharacteristic(
        characteristic: BluetoothRemoteGATTCharacteristic,
        uuid: string
    ): void {
        const mapped = this.birdCharacteristics.find((bc) => bc.uuid === uuid);
        mapped.isReady = true;
        characteristic.addEventListener(
            'characteristicvaluechanged',
            (event) => {
                mapped.value = (event.target as any).value.getUint8(0);
            }
        );
        this.isConnecting = this.birdCharacteristics.some((bc) => !bc.isReady);
    }

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

    private setErrorState(error: ErrorState): void {
        this.isConnecting = false;
        this.errorState = error;
    }
}
