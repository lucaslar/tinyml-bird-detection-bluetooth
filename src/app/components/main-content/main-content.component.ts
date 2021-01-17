import { Component } from '@angular/core';
import { BluetoothService } from '../../services/bluetooth.service';

/**
 * Component containing main content to be shown and logic which content is to be shown in which case.
 */
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
