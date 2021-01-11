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
}
