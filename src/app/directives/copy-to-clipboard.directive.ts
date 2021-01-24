import { Directive, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

/**
 * Directive for copying a given string to the clipboard.
 */
@Directive({
    selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
    /**
     * Value to be copied or function returning the value to be copied.
     * @private
     */
    @Input() private readonly appCopyToClipboard: string | (() => string);

    /**
     * @param snackBar Injected Material Snackbar class.
     * @param translate Injected translation service.
     */
    constructor(
        private snackBar: MatSnackBar,
        private translate: TranslateService
    ) {}

    /**
     * Prevents a click event and copies {{ text }} to the clipboard instead. Afterwards, a snackbar is opened in order
     * to inform the user.
     *
     * @param event Click event ot be prevented.
     */
    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        event.preventDefault();
        const listener = (e: ClipboardEvent) => {
            (e.clipboardData || (window as any).clipboardData).setData(
                'text',
                typeof this.appCopyToClipboard === 'string'
                    ? this.appCopyToClipboard
                    : this.appCopyToClipboard()
            );
            e.preventDefault();
            this.showSnackbar();
        };

        document.addEventListener('copy', listener, false);
        document.execCommand('copy');
        document.removeEventListener('copy', listener, false);
    }

    /**
     * Opens a snackbar informing the user about successful copying.
     * @private
     */
    private showSnackbar(): void {
        const messageKey = 'general.copied';
        const closeKey = 'general.close';
        this.translate.get([messageKey, closeKey]).subscribe((t) => {
            this.snackBar.open(t[messageKey], t[closeKey], { duration: 2000 });
        });
    }
}
