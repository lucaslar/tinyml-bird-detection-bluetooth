/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BluetoothService {
    private readonly service = 'e50bf554-fdd9-4d9e-b350-86493ab13280';
    private readonly characteristic = 'afea4db0-1ef6-4653-bb67-aa14b4d804bb';
    private _value;
    private device: BluetoothDevice;

    connect(): void {
        navigator.bluetooth
            .requestDevice({ filters: [{ services: [this.service] }] })
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
                return characteristic.readValue();
            })
            .then((value) => (this._value = value.getUint8(0)))
            .catch((e) => console.log(e));
    }

    disconnect(): void {
        if (
            this.isDeviceConnected &&
            // TODO: Improve dialog
            confirm('Are you sure you want to disconnect?')
        ) {
            this.device.gatt.disconnect();
            delete this.device;
        }
    }

    get value(): number {
        return this._value;
    }

    get isDeviceConnected(): any {
        return this.device?.gatt.connected;
    }
}
