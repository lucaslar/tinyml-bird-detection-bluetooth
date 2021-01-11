import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../model/internal/language';
import { StorageService } from './storage.service';

/**
 * Service for localizing the application and managing languages and language selections.
 */
@Injectable({
    providedIn: 'root',
})
export class I18nService {
    /**
     * List of languages the app is available in.
     */
    readonly supportedLanguages: Language[] = [
        new Language('en', 'English', 'gb'),
        new Language('de', 'Deutsch'),
        // TODO: Include in future:
        // new Language('fr', 'Français'),
        // new Language('es', 'Español'),
        // new Language('pt', 'Português', 'br'),
    ];

    /**
     * Currently selected language.
     */
    currentLanguage: Language;

    /**
     * Sets the default language of the translation service.
     *
     * @param translate Injected translation service (ngx-translate).
     * @param storage Injected storage service.
     */
    constructor(
        private readonly translate: TranslateService,
        private readonly storage: StorageService
    ) {
        this.translate.setDefaultLang(this.supportedLanguages[0].id);
    }

    /**
     * Initializes the translate service with either:
     * - the stored language if set
     * - or the browser/navigator language if supported
     * - or the default language
     */
    initialize(): void {
        const storedId = this.storage.language;
        const id =
            storedId ??
            this.supportedUserLanguageId ??
            this.translate.defaultLang;
        this.useLanguage(this.supportedLanguages.find((l) => l.id === id));
    }

    /**
     * @param language Language to be used and stored.
     */
    useLanguage(language: Language): void {
        this.currentLanguage = language;
        this.translate.use(this.currentLanguage.id);
        this.storage.language = this.currentLanguage.id;
    }

    /**
     * @private
     * @returns The first language listed as user preference (browser) that matches
     *          a supported language or undefined in case of no match.
     */
    private get supportedUserLanguageId(): string {
        return [...navigator.languages, navigator.language]
            .filter((l) => !!l)
            .map((l) => l.split('-')[0])
            .find((l) =>
                this.supportedLanguages
                    .map((supported) => supported.id)
                    .includes(l)
            );
    }
}
