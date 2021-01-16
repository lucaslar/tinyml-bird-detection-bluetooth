import { Component, OnInit } from '@angular/core';
import { I18nService } from './services/i18n.service';
import { ThemingService } from './services/theming.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoSlidesComponent } from './components/dialogs/info-slides/info-slides.component';
import { StorageService } from './services/storage.service';

/**
 * Central component of the application (SPA).
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    /**
     * @param theming Injected theming service.
     * @param i18n Injected internationalization service.
     * @param dialog Injected dialog service.
     * @param storage Injected storage service.
     */
    constructor(
        readonly theming: ThemingService,
        private readonly i18n: I18nService,
        private readonly dialog: MatDialog,
        private readonly storage: StorageService
    ) {}

    /**
     * Initializes the application's internationalization and opens an onboarding dialog in case of no stored onboarding boolean.
     * If this dialog is closed, the boolean is stored locally.
     */
    ngOnInit(): void {
        this.i18n.initialize();
        if (!this.storage.isOnboarded) {
            this.dialog
                .open(InfoSlidesComponent, {
                    disableClose: true,
                    data: { isOnboarding: true },
                })
                .afterClosed()
                .subscribe(() => (this.storage.isOnboarded = true));
        }
    }
}
