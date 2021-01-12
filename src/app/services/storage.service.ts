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
     * @returns true if the dark mode is stored in the database, false if not.
     */
    get isDarkTheme(): boolean {
        return !!localStorage.getItem(this.keyIsDarkTheme);
    }

    /**
     * @param value If true, a value will be stored in the local storage, otherwise
     *        it will be deleted.
     */
    set isDarkTheme(value: boolean) {
        value
            ? localStorage.setItem(this.keyIsDarkTheme, '1')
            : localStorage.removeItem(this.keyIsDarkTheme);
    }
}
