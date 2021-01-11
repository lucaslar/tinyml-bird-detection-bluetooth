import { Component } from '@angular/core';
import { BluetoothService } from './services/bluetooth.service';
import { I18nService } from './services/i18n.service';

/**
 * Central component of the application (SPA).
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(readonly bluetooth: BluetoothService, i18n: I18nService) {
        i18n.initialize();
    }
}
