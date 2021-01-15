import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Content of the language selection dialog.
 */
@Component({
    selector: 'app-language-selection-dialog',
    templateUrl: './language-selection-dialog.component.html',
    styleUrls: ['./language-selection-dialog.component.scss'],
})
export class LanguageSelectionDialogComponent {
    /**
     * @param dialogRef Injected dialog container ref to be used for closing the dialog with the selected language.
     */
    constructor(
        readonly dialogRef: MatDialogRef<LanguageSelectionDialogComponent>
    ) {}
}
