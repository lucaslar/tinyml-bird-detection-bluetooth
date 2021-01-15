import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type slide = {
    title: string;
    component?: 'first-settings';
    content: any;
};

/**
 * Component containing info slides.
 */
@Component({
    selector: 'app-info-slides',
    templateUrl: './info-slides.component.html',
    styleUrls: ['./info-slides.component.scss'],
})
export class InfoSlidesComponent implements OnInit {
    /**
     * Currently active index.
     */
    activeIndex = 0;

    /**
     * Highest selected index.
     */
    highestClickedIndex = 0;

    // TODO Remove?
    readonly slides: slide[];

    /**
     * True if onboarding slides are to be shown, false if not.
     * @private
     */
    readonly isOnboarding: boolean;

    /**
     * Material dialog content container.
     *
     * @private
     */
    @ViewChild('content') private readonly content: ElementRef;

    /**
     * @param data Injected data
     */
    constructor(@Inject(MAT_DIALOG_DATA) data: { isOnboarding: boolean }) {
        this.isOnboarding = data?.isOnboarding;
        this.slides = [];
        [
            'Lorem ipsum',
            'Arduino',
            'Bird Detection Bird Detection Bird Detection',
        ].forEach((s) =>
            this.slides.push({
                title: `Slide "${s}"`,
                content: `${s} `.repeat(123),
            })
        );
    }

    /**
     * Triggers a resize event programmatically in order to handle side bar sizing.
     */
    ngOnInit(): void {
        setTimeout(() => window.dispatchEvent(new Event('resize')));
    }

    /**
     * Sets the given as {{ activeIndex }} and {{ highestClickedIndex }} if the index is higher
     * than the previous highest clicked index. Also, it scrolls to the top of the new slide and programmatically
     * fires a resize event in order to handle side bar sizing.
     *
     * @param index Index to be set as active.
     */
    onIndexChanged(index: number): void {
        this.activeIndex = index;
        this.highestClickedIndex = Math.max(this.highestClickedIndex, index);
        this.content.nativeElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    }

    /**
     * Sets the current active index in case of not being higher than the highest clicked index.
     *
     * @param index Index to be set as active (if legal).
     */
    onPaginationClicked(index: number): void {
        if (!this.isOnboarding || index <= this.highestClickedIndex) {
            this.activeIndex = index;
        }
    }
}
