/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';

// TODO: export type/rename/change logic?
type characteristicType = {
    uuid: string;
    translationKey: string;
    value: number;
    isReady: boolean;
};

@Injectable({
    providedIn: 'root',
})
export class BluetoothService {
    // TODO: Add doc.

    state: string;
    isConnecting: boolean;
    readonly isSupported = !!navigator.bluetooth;
    readonly service = 'e50bf554-fdd9-4d9e-b350-86493ab13280';

    readonly characteristics: characteristicType[] = [
        {
            uuid: 'afea4db0-1ef6-4653-bb67-aa14b4d804bb',
            translationKey: 'bird1',
            value: undefined,
            isReady: false,
        },
        {
            uuid: 'a950cb51-4b4e-45ed-9c5b-44dc101e57ed',
            translationKey: 'bird2',
            value: undefined,
            isReady: false,
        },
        {
            uuid: '841760cc-c842-4d1b-994d-972fcae34e88',
            translationKey: 'bird3',
            value: undefined,
            isReady: false,
        },
    ];

    private device: BluetoothDevice;

    onBluetoothPressed(): void {
        this.isDeviceConnected ? this.disconnect() : this.connect();
    }

    get currentIcon(): string {
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
        return this.device.name;
    }

    private connect(): void {
        // TODO Add states
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
        const connection = device.gatt.connect();
        this.isConnecting = true;
        connection.then(() => {
            this.device = device;
            this.device.addEventListener('gattserverdisconnected', () =>
                this.onDisconnected()
            );
        });
        return connection;
    }

    private onDisconnected(): void {
        this.device?.removeEventListener(
            'gattserverdisconnected',
            this.onDisconnected
        );
        // TODO: Show snackbar
        delete this.device;
        this.characteristics.forEach((c) => (c.isReady = false));
    }

    private listenToAllCharacteristics(
        characteristics: BluetoothRemoteGATTCharacteristic[]
    ): void {
        let queue = Promise.resolve();
        characteristics.forEach((characteristic) => {
            if (
                this.characteristics.some((c) => c.uuid === characteristic.uuid)
            ) {
                queue = queue.then(() => {
                    return characteristic.startNotifications().then((c) => {
                        this.listenToSpecificCharacteristic(c, c.uuid);
                    });
                });
            }
        });
    }

    private listenToSpecificCharacteristic(
        characteristic: BluetoothRemoteGATTCharacteristic,
        uuid: string
    ): void {
        const mapped = this.characteristics.find((c) => c.uuid === uuid);
        mapped.isReady = true;
        characteristic.addEventListener(
            'characteristicvaluechanged',
            (event) => {
                mapped.value = (event.target as any).value.getUint8(0);
            }
        );
        this.isConnecting = this.characteristics.some((c) => !c.isReady);
    }

    private handleError(error: Error): void {
        if (
            error instanceof DOMException &&
            error?.message === 'Web Bluetooth API globally disabled.'
        ) {
            this.setErrorState('BLUETOOTH_API_DISABLED');
        } else if (
            !(
                error instanceof DOMException &&
                error?.message === 'User cancelled the requestDevice() chooser.'
            )
        ) {
            this.setErrorState('OTHER_ERROR');
            throw error;
        }
    }

    private setErrorState(error: string): void {
        this.isConnecting = false;
        this.state = `ERROR.${error}`;
    }
}
