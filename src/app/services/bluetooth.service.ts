/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BluetoothService {
    // TODO: Add doc.

    readonly isSupported = !!navigator.bluetooth;
    private readonly service = 'e50bf554-fdd9-4d9e-b350-86493ab13280';
    private readonly characteristic = 'afea4db0-1ef6-4653-bb67-aa14b4d804bb';
    private _value;
    private device: BluetoothDevice;
    private _state: string;

    onBluetoothPressed(): void {
        this.isDeviceConnected ? this.disconnect() : this.connect();
    }

    get value(): any {
        return this._value;
    }

    get currentIcon(): string {
        if (this.isSupported) {
            return this.isDeviceConnected ? 'bluetooth_connected' : 'bluetooth';
        } else {
            return 'bluetooth_disabled';
        }
    }

    get isDeviceConnected(): any {
        return this.device?.gatt.connected;
    }

    get state(): string {
        return this._state;
    }
    private connect(): void {
        const filters = [{ services: [this.service] }];
        navigator.bluetooth
            .requestDevice({ filters })
            .then((device) => {
                const connection = device.gatt.connect();
                connection.then(() => (this.device = device));
                return connection;
            })
            .then((server) => server.getPrimaryService(this.service))
            .then((service) => service.getCharacteristic(this.characteristic))
            .then((characteristic) => characteristic.startNotifications())
            .then((characteristic) => {
                characteristic.addEventListener(
                    'characteristicvaluechanged',
                    (event) =>
                        (this._value = (event.target as any).value.getUint8(0))
                );
            })
            .catch((error: Error) => this.handleError(error));
    }

    private disconnect(): void {
        if (
            this.isDeviceConnected &&
            // TODO: Improve dialog
            confirm('Are you sure you want to disconnect?')
        ) {
            this.device.gatt.disconnect();
            delete this.device;
        }
    }

    private handleError(error: Error): void {
        if (
            error instanceof DOMException &&
            error?.message === 'Web Bluetooth API globally disabled.'
        ) {
            this.setErrorState('BLUETOOTH_API_DISABLED');
        } else if (
            error instanceof DOMException &&
            error?.message === 'User cancelled the requestDevice() chooser.'
        ) {
            this.setErrorState('CANCELLED_CHOOSING');
        } else {
            this.setErrorState('OTHER_ERROR');
            throw error;
        }
    }

    private setErrorState(error: string): void {
        this._state = `ERROR.${error}`;
    }
}
