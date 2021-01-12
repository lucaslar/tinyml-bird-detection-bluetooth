import {
    Directive,
    ElementRef,
    HostBinding,
    Inject,
    NgZone,
    ViewContainerRef,
} from '@angular/core';
import {
    MAT_TOOLTIP_DEFAULT_OPTIONS,
    MAT_TOOLTIP_SCROLL_STRATEGY,
    MatTooltip,
} from '@angular/material/tooltip';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip/tooltip';

/**
 * Directive to be used both cutting text (ellipsis) if it overflows and adding a tooltip
 * (Material) to be displayed on hovering the element in this case.
 */
@Directive({
    selector: '[appEllipsisTooltip]',
})
export class EllipsisTooltipDirective extends MatTooltip {
    /**
     * Style attribute: "display: inline". (required for being able to cut the text)
     * @private
     */
    @HostBinding('style.display') private readonly display = 'inline';

    /**
     * Style attribute: "white-space: nowrap". (required in order to not break the word)
     * @private
     */
    @HostBinding('style.white-space') private readonly whiteSpace = 'nowrap';

    /**
     * Style attribute: "text-overflow: ellipsis". (required in order to show dots on breaking)
     * @private
     */
    @HostBinding('style.text-overflow') private readonly tOverflow = 'ellipsis';

    /**
     * Style attribute: "overflow: hidden". (required in order to prevent from scrolling)
     * @private
     */
    @HostBinding('style.overflow') private readonly overflow = 'hidden';

    /**
     * Boolean set to true after initially calling message. This is needed since the first message
     * must not be empty.
     * @private
     */
    private isInitialized = false;

    /**
     * Calls the constructor of the MatTooltip directive with all required injected params.
     *
     * @param el Injected element reference.
     * @param _overlay Injected overlay.
     * @param _scrollDispatcher Injected ScrollDispatcher.
     * @param _viewContainerRef Injected ViewContainerRef.
     * @param _ngZone Injected NgZone.
     * @param _platform Injected Platform.
     * @param _ariaDescriber Injected AriaDescriber.
     * @param _focusMonitor Injected FocusMonitor.
     * @param _scrollStrategy Injected ScrollStrategy
     * @param _dir Injected Directionality.
     * @param _defaultOptions Injected MatTooltipDefaultOptions.
     */
    constructor(
        private readonly el: ElementRef<HTMLElement>,
        _overlay: Overlay,
        _scrollDispatcher: ScrollDispatcher,
        _viewContainerRef: ViewContainerRef,
        _ngZone: NgZone,
        _platform: Platform,
        _ariaDescriber: AriaDescriber,
        _focusMonitor: FocusMonitor,
        @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) _scrollStrategy: any,
        _dir: Directionality,
        @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS)
        _defaultOptions: MatTooltipDefaultOptions
    ) {
        super(
            _overlay,
            el,
            _scrollDispatcher,
            _viewContainerRef,
            _ngZone,
            _platform,
            _ariaDescriber,
            _focusMonitor,
            _scrollStrategy,
            _dir,
            _defaultOptions
        );
    }

    /**
     * @returns the HTML element's inner text in case of overflowing or an empty string ( => no tooltip )
     * if the text is displayed correctly. Initially, the inner text is returned and {{ isInitialized }} is set
     * to true.
     */
    get message(): string {
        if (
            !this.isInitialized ||
            this.el.nativeElement.scrollWidth !==
                this.el.nativeElement.offsetWidth
        ) {
            this.isInitialized = true;
            return this.el.nativeElement.innerText;
        } else {
            return '';
        }
    }
}
