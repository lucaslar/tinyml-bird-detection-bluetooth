import { Injectable } from '@angular/core';

/**
 * Service to be used for storing items using local storage.
 */
@Injectable({
    providedIn: 'root',
})
export class StorageService {
    /**
     * Key for the currently stored language.
     * @private
     */
    private keyLanguage = 'stored_language_id';

    /**
     * Key for a boolean value whether dark mode is set or not.
     * @private
     */
    private keyIsDarkTheme = 'is_dark_theme_set';

    /**
     * Key for a boolean value whether the user (device) is onboarded or not.
     * @private
     */
    private keyIsOnboarded = 'is_onboarded';

    /**
     * @returns Stored language ID.
     */
    get language(): string {
        return localStorage.getItem(this.keyLanguage);
    }

    /**
     * Stores a language ID to local storage.
     * @param value
     */
    set language(value: string) {
        localStorage.setItem(this.keyLanguage, value);
    }

    /**
     * @returns true if the dark mode is stored in the local storage, false if not.
     */
    get isDarkTheme(): boolean {
        return !!localStorage.getItem(this.keyIsDarkTheme);
    }

    /**
     * @param value If true, a value indicating dark mode is to be displayed will be
     *        stored in the local storage, otherwise it will be deleted.
     */
    set isDarkTheme(value: boolean) {
        value
            ? localStorage.setItem(this.keyIsDarkTheme, '1')
            : localStorage.removeItem(this.keyIsDarkTheme);
    }

    /**
     * @returns true if the user (device) has already been onboarded, false if not.
     */
    get isOnboarded(): boolean {
        return !!localStorage.getItem(this.keyIsOnboarded);
    }

    /**
     * @param value If true, a value indicating the user (device) has been onboarded will
     *        be stored in the local storage, otherwise it will be deleted.
     */
    set isOnboarded(value: boolean) {
        value
            ? localStorage.setItem(this.keyIsOnboarded, '1')
            : localStorage.removeItem(this.keyIsOnboarded);
    }
}
