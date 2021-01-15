import { Component, EventEmitter, Output } from '@angular/core';
import { I18nService } from '../../../services/i18n.service';
import { Language } from '../../../model/internal/language';

/**
 * Container of buttons with flags and name with an output event on clciking one.
 */
@Component({
    selector: 'app-language-selection',
    templateUrl: './language-selection.component.html',
    styleUrls: ['./language-selection.component.scss'],
})
export class LanguageSelectionComponent {
    /**
     * Emits the language selected by the user.
     */
    @Output()
    readonly languageSelected: EventEmitter<Language> = new EventEmitter<Language>();

    /**
     * @param i18n Injected internationalization service.
     */
    constructor(readonly i18n: I18nService) {}
}
