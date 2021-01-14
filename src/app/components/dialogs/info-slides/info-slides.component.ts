import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

    // TODO Remove
    slides = [
        'Lorem ipsum',
        'Arduino',
        'Bird Detection Bird Detection Bird Detection',
    ].map((s) => ({
        title: `Slide "${s}"`,
        content: `${s} `.repeat(123),
    }));

    /**
     * Material dialog content container.
     */
    @ViewChild('content') content: ElementRef;

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
        if (index <= this.highestClickedIndex) {
            this.activeIndex = index;
        }
    }
}
