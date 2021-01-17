import { Component, Input } from '@angular/core';
import { Slide } from '../../../../model/internal/slide';

/**
 * Component for dynamically displaying slide content.
 */
@Component({
    selector: 'app-info-slide-content',
    templateUrl: './info-slide-content.component.html',
    styleUrls: ['./info-slide-content.component.scss'],
})
export class InfoSlideContentComponent {
    /**
     * Slide content to be displayed.
     */
    @Input() readonly slide: Slide;

    /**
     * Opens a given link in a new tab.
     * @param link Link to opened.
     */
    onLinkClicked(link: { linkRef: string }): void {
        window.open(link.linkRef);
    }
}
