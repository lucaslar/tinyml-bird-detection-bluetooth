/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BluetoothService {
    // TODO: Add doc.

    state: string;
    isConnecting: boolean;
    readonly isSupported = !!navigator.bluetooth;
    private readonly service = 'e50bf554-fdd9-4d9e-b350-86493ab13280';
    private readonly characteristic = 'afea4db0-1ef6-4653-bb67-aa14b4d804bb';
    private _value;
    private device: BluetoothDevice;

    onBluetoothPressed(): void {
        this.isDeviceConnected ? this.disconnect() : this.connect();
    }

    get value(): any {
        return this._value;
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
        return this.device?.gatt.connected;
    }

    private onDisconnected(): void {
        this.device?.removeEventListener(
            'gattserverdisconnected',
            this.onDisconnected
        );
        // TODO: Show snackbar
        delete this.device;
    }

    private onDeviceFound(device): any {
        const connection = device.gatt.connect();
        connection.then(() => {
            this.device = device;
            this.device.addEventListener(
                'gattserverdisconnected',
                this.onDisconnected
            );
        });
        return connection;
    }

    private listenCharacteristic(characteristic): void {
        characteristic.addEventListener(
            'characteristicvaluechanged',
            (event) => {
                this._value = (event.target as any).value.getUint8(0);
            }
        );
        this.isConnecting = false;
    }

    private connect(): void {
        this.isConnecting = true;
        navigator.bluetooth
            .requestDevice({ filters: [{ services: [this.service] }] })
            .then((device) => this.onDeviceFound(device))
            .then((server) => server.getPrimaryService(this.service))
            .then((service) => service.getCharacteristic(this.characteristic))
            .then((characteristic) => characteristic.startNotifications())
            .then((characteristic) => this.listenCharacteristic(characteristic))
            .catch((error: Error) => {
                this.handleError(error);
                this.isConnecting = false;
            });
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
        this.state = `ERROR.${error}`;
    }
}
