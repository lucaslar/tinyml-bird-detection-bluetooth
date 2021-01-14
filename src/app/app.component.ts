import { Component } from '@angular/core';
import { BluetoothService } from './services/bluetooth.service';
import { I18nService } from './services/i18n.service';
import { ThemingService } from './services/theming.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoSlidesComponent } from './components/dialogs/info-slides/info-slides.component';

/**
 * Central component of the application (SPA).
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(
        readonly bluetooth: BluetoothService,
        readonly theming: ThemingService,
        i18n: I18nService,
        dialog: MatDialog
    ) {
        i18n.initialize();
        dialog.open(InfoSlidesComponent, { disableClose: true });
    }
}
