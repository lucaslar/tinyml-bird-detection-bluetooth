import { Component } from '@angular/core';
import { BluetoothService } from '../../../services/bluetooth.service';

/**
 * Component containing a prominent Bluetooth button for connection and some further information.
 */
@Component({
    selector: 'app-bluetooth-connect',
    templateUrl: './bluetooth-connect.component.html',
    styleUrls: ['./bluetooth-connect.component.scss'],
})
export class BluetoothConnectComponent {
    /**
     * @param bluetooth injected Bluetooth service.
     */
    constructor(readonly bluetooth: BluetoothService) {}
}
