import { Component } from '@angular/core';
import { BluetoothService } from './services/bluetooth.service';

/**
 * Central component of the application (SPA).
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(readonly bluetooth: BluetoothService) {}
}
