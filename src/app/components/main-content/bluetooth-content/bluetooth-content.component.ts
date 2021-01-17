import { Component } from '@angular/core';
import { BluetoothService } from '../../../services/bluetooth.service';

/**
 * Component for displaying the results emitted by the Bluetooth device.
 */
@Component({
    selector: 'app-bluetooth-content',
    templateUrl: './bluetooth-content.component.html',
    styleUrls: ['./bluetooth-content.component.scss'],
})
export class BluetoothContentComponent {
    /**
     * @param bluetooth Injected Bluetooth service.
     */
    constructor(readonly bluetooth: BluetoothService) {}
}
