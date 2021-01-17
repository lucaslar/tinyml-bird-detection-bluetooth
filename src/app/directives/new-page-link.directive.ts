import { Directive, HostListener, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * Directive for opening a given link on a new page and showing a tooltip on hovering.
 */
@Directive({
    selector: '[appNewPageLink]',
})
export class NewPageLinkDirective extends MatTooltip {

    /**
     * Link to opened and displayed as tooltip.
     */
    @Input() readonly appNewPageLink: string;

    /**
     * Opens the given link in a new tab on click.
     */
    @HostListener('click') onClick(): void {
        window.open(this.appNewPageLink);
    }

    /**
     * Message to be displayed as tooltip.
     */
    get message(): string {
        return this.appNewPageLink;
    }
}
