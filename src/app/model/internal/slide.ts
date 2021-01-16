import { faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * List of all slides to be displayed.
 */
const slides: Slide[] = [
    {
        title: 'placeholder.a',
        content: [
            {
                type: 'icon',
                icon: faMicrochip,
            },
            {
                type: 'text',
                text: ['placeholder.a'],
            },
        ],
        isOnboarding: true,
    },
    {
        title: 'placeholder.b',
        content: [
            { type: 'text', text: ['placeholder.c', 'placeholder.d'] },
            {
                type: 'img',
                src:
                    'https://images.pexels.com/photos/4409307/pexels-photo-4409307.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
                alt: 'placeholder.a',
            },
            {
                type: 'nested',
                nested: [
                    { type: 'icon', icon: faMicrochip },
                    {
                        type: 'text',
                        text: ['placeholder.c'],
                    },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'icon', icon: faMicrochip },
                    { type: 'icon', icon: faMicrochip },
                    { type: 'icon', icon: faMicrochip },
                ],
            },
            { type: 'icon', icon: faMicrochip },
        ],
    },
];

/**
 * Displayable slide.
 */
export class Slide {
    /**
     * Title (translation key) of the slide.
     */
    readonly title: string;

    /**
     * List of slide content.
     */
    readonly content: (Text | Image | Icon | Nested)[];

    /**
     * True if the slide is only to be shown in onboarding context, false if not.
     */
    readonly isOnboarding?: boolean;

    /**
     * Returns all slides to be displayed based on the content, i.e. including/excluding onboarding slides.
     * @param isOnboarding True if onboarding slides are to be included, false if not.
     */
    static getSlides(isOnboarding: boolean): Slide[] {
        return slides.filter((slide) => {
            return +!!slide.isOnboarding <= +!!isOnboarding;
        });
    }
}

/**
 * Text content to be shown.
 */
class Text {
    /**
     * Content id.
     */
    readonly type = 'text';

    /**
     * Text paragraphs (translation keys) to be displayed.
     */
    readonly text: string[];
}

/**
 * Image to be shown.
 */
class Image {
    /**
     * Content id.
     */
    readonly type = 'img';

    /**
     * Path to the image to be shown.
     */
    readonly src: string;

    /**
     * Alt text to be displayed.
     */
    readonly alt: string;
}

/**
 * Icon to be shown.
 */
class Icon {
    /**
     * Content id.
     */
    readonly type = 'icon';

    /**
     * Icon to be displayed.
     */
    readonly icon: IconProp;
}

/**
 * Nested content to be shown as one row.
 */
class Nested {
    /**
     * Content id.
     */
    readonly type = 'nested';

    /**
     * Array of content to be shown in one row.
     */
    readonly nested: (Text | Image | Icon)[];
}
