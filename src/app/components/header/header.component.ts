import { Component, HostListener } from '@angular/core';
import { BluetoothService } from '../../services/bluetooth.service';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from '../../services/i18n.service';
import { ThemingService } from '../../services/theming.service';
import { InfoSlidesComponent } from '../dialogs/info-slides/info-slides.component';
import {LanguageSelectionDialogComponent} from '../dialogs/language-selection-dialog/language-selection-dialog.component';

/**
 * Component containing the content of the application's header.
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    /**
     * True if the window is scrolled, false if not.
     */
    isScrolled: boolean;

    /**
     * @param bluetooth Injected Bluetooth service.
     * @param theming Injected theming service.
     * @param dialog Injected Material Dialog service.
     * @param i18n Injected internationalization service.
     */
    constructor(
        readonly bluetooth: BluetoothService,
        readonly theming: ThemingService,
        private readonly dialog: MatDialog,
        private readonly i18n: I18nService
    ) {}

    /**
     * Opens a dialog for selecting a language, subscribes to the close event of this dialog and sets
     * a language in case of having been selected.
     */
    onLanguagesClicked(): void {
        this.dialog
            .open(LanguageSelectionDialogComponent)
            .afterClosed()
            .subscribe((language) => {
                if (language) {
                    this.i18n.useLanguage(language);
                }
            });
    }

    /**
     * Opens info slides dialogs.
     */
    onInfoClicked(): void {
        this.dialog.open(InfoSlidesComponent);
    }

    /**
     * Checks whether the user has scrolled or the scrollbar is at the top and sets
     * {{ isScrolled }} accordingly. (Triggered whenever the window is scrolled)
     */
    @HostListener('window:scroll') onScroll(): void {
        this.isScrolled = window.pageYOffset > 0;
    }
}
