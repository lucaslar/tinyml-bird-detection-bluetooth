import { Component } from '@angular/core';
import { BluetoothService } from '../../../services/bluetooth.service';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';

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
     * Icon to be displayed next to the values.
     */
    readonly birdIcon = faKiwiBird;
    /**
     * @param bluetooth Injected Bluetooth service.
     */
    constructor(readonly bluetooth: BluetoothService) {}
}
