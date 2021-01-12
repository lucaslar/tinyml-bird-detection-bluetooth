import { Component } from '@angular/core';
import { BluetoothService } from '../../services/bluetooth.service';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
    /**
     * @param bluetooth Injected Bluetooth service.
     */
    constructor(readonly bluetooth: BluetoothService) {}
}
