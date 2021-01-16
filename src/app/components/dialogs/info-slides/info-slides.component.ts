import {
    Component,
    ElementRef,
    HostListener,
    Inject,
    ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { heightTransition } from '../../../consts/animations';
import { Language } from '../../../model/internal/language';
import { I18nService } from '../../../services/i18n.service';
import { Slide } from '../../../model/internal/slide';

/**
 * Component containing info slides.
 */
@Component({
    selector: 'app-info-slides',
    animations: [heightTransition],
    templateUrl: './info-slides.component.html',
    styleUrls: ['./info-slides.component.scss'],
})
export class InfoSlidesComponent {
    /**
     * Currently active index.
     */
    activeIndex = 0;

    /**
     * Highest selected index.
     */
    highestClickedIndex = 0;

    /**
     * True if the language selection dialog is to be displayed, false if not.
     */
    isLanguagesDisplayed = false;

    /**
     * Slides to be displayed.
     */
    readonly slides: Slide[];

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
     * Initializes the slices and the {{ isOnboarding }}.
     *
     * @param data Injected data
     * @param i18n Injected internationalization service.
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) data: { isOnboarding: boolean },
        private readonly i18n: I18nService
    ) {
        this.isOnboarding = data?.isOnboarding;
        this.slides = Slide.getSlides(this.isOnboarding);
    }

    /**
     * Triggers resize event(s) programmatically in order to handle side bar sizing prevent frozen state due to slidesPerView="auto".
     */
    triggerResize(...delays: number[]): void {
        delays.forEach((delay) => {
            setTimeout(() => dispatchEvent(new Event('resize')), delay);
        });
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
        this.triggerResize(300);
    }

    /**
     * Sets the current active index in case of not being higher than the highest clicked index.
     *
     * @param index Index to be set as active (if legal).
     */
    onPaginationClicked(index: number): void {
        if (
            !this.isLanguagesDisplayed &&
            (!this.isOnboarding || index <= this.highestClickedIndex)
        ) {
            this.activeIndex = index;
        }
    }

    /**
     * Changes the language and hides the language selection
     *
     * @param language Language selected by the user.
     */
    onLanguageSelected(language: Language): void {
        this.isLanguagesDisplayed = false;
        this.i18n.useLanguage(language);
    }

    /**
     * Host listener for arrows (left/right) which will be handled as swiping.
     *
     * @param event Keydown event.
     */
    @HostListener('document:keydown', ['$event'])
    private onKeydown(event: KeyboardEvent): void {
        if (
            !this.isLanguagesDisplayed &&
            event.key === 'ArrowLeft' &&
            this.activeIndex - 1 >= 0
        ) {
            this.activeIndex--;
        } else if (
            !this.isLanguagesDisplayed &&
            event.key === 'ArrowRight' &&
            this.activeIndex + 1 < this.slides.length
        ) {
            this.activeIndex++;
        }
    }
}
