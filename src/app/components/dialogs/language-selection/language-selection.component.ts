import { Component } from '@angular/core';
import { I18nService } from '../../../services/i18n.service';

/**
 * Content of the language selection dialog.
 */
@Component({
    selector: 'app-language-selection',
    templateUrl: './language-selection.component.html',
    styleUrls: ['./language-selection.component.scss'],
})
export class LanguageSelectionComponent {
    /**
     * @param i18n Injected internationalization service.
     */
    constructor(readonly i18n: I18nService) {}
}
