import { faKiwiBird, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBluetooth, faGithub } from '@fortawesome/free-brands-svg-icons';

/**
 * List of all slides to be displayed.
 */
const slides: Slide[] = [
    {
        title: 'placeholder.a',
        content: [
            {
                type: 'icon',
                icon: faKiwiBird,
            },
            {
                type: 'text',
                text: ['placeholder.b'],
            },
        ],
        isOnboarding: true,
    },
    {
        title: 'placeholder.a',
        content: [
            {
                type: 'icon',
                icon: faGithub,
            },
            {
                type: 'link',
                text: 'placeholder.b',
                linkRef:
                    'https://github.com/lucaslar/tinyml-bird-detection-bluetooth',
            },
        ],
    },
    {
        title: 'placeholder.b',
        content: [
            {
                type: 'img',
                src:
                    'https://images.pexels.com/photos/3067503/pexels-photo-3067503.jpeg?cs=srgb&dl=pexels-felipe-cespedes-3067503.jpg&fm=jpg',
                alt: 'placeholder.a',
            },
            {
                type: 'nested',
                nested: [
                    { type: 'text', text: ['placeholder.d', 'placeholder.c'] },
                    { type: 'text', text: ['placeholder.c', 'placeholder.c'] },
                ],
            },
            {
                type: 'nested',
                nested: [
                    {
                        type: 'img',
                        src:
                            'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?cs=srgb&dl=pexels-anna-shvets-4588052.jpg&fm=jpg',
                        alt: 'placeholder.a',
                    },
                    {
                        type: 'img',
                        src:
                            'https://images.pexels.com/photos/3726314/pexels-photo-3726314.jpeg?cs=srgb&dl=pexels-julissa-helmuth-3726314.jpg&fm=jpg',
                        alt: 'placeholder.a',
                    },
                ],
            },
        ],
    },
    {
        title: 'placeholder.a',
        content: [
            { type: 'text', text: ['placeholder.c', 'placeholder.d'] },
            {
                type: 'img',
                src:
                    'https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?cs=srgb&dl=pexels-anna-shvets-4588047.jpg&fm=jpg',
                alt: 'placeholder.a',
            },
            {
                type: 'nested',
                nested: [
                    {
                        type: 'img',
                        src:
                            'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg',
                        alt: 'placeholder.b',
                    },
                    {
                        type: 'text',
                        text: ['placeholder.a', 'placeholder.c'],
                    },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'icon', icon: faMicrochip },
                    {
                        type: 'text',
                        text: ['placeholder.d'],
                    },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'icon', icon: faMicrochip },
                    { type: 'icon', icon: faKiwiBird },
                    { type: 'icon', icon: faBluetooth },
                ],
            },
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
    readonly content: (Text | Image | Icon | Link | Nested)[];

    /**
     * True if the slide is only to be shown in onboarding context, false if not.
     */
    readonly isOnboarding?: boolean;

    /**
     * @param isOnboarding True if onboarding slides are to be included, false if not.
     * @returns All slides to be displayed based on the content, i.e. including/excluding onboarding slides.
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

class Link {
    /**
     * Content id.
     */
    readonly type = 'link';

    /**
     * Path to be opened in a new window.
     */
    readonly linkRef: string;

    /**
     * Text to be displayed
     */
    readonly text: string;
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
    readonly nested: (Text | Image | Icon | Link)[];
}