import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { StorageService } from './storage.service';

/**
 * Service for customizing the application, i.e. switching between light and
 * dark mode.
 */
@Injectable({
    providedIn: 'root',
})
export class ThemingService {
    /**
     * True if the app is to be shown in dark mode, false if not.
     */
    isDarkTheme: boolean;

    /**
     * Initializes the dark theme boolean and updates the overlay class list accordingly.
     *
     * @param overlayContainer Injected overlay container (important for overlay components such as dialogs).
     * @param storage Injected storage service.
     */
    constructor(
        private readonly overlayContainer: OverlayContainer,
        private readonly storage: StorageService
    ) {
        this.isDarkTheme = this.storage.isDarkTheme;
        this.updateOverlayClassList();
    }

    /**
     * Toggles between light and dark mode and also updates the stored value and the overlay component's
     * class list.
     */
    toggleLightDarkMode(): void {
        this.isDarkTheme = !this.isDarkTheme;
        this.storage.isDarkTheme = this.isDarkTheme;
        this.updateOverlayClassList();
    }

    /**
     * Updates the overlay component's class list based on whether the items are to be displayed in dark mode or not.
     */
    private updateOverlayClassList(): void {
        const classList = this.overlayContainer.getContainerElement().classList;
        this.isDarkTheme
            ? classList.add('dark-theme')
            : classList.remove('dark-theme');
    }
}
