import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faAndroid,
    faApple,
    faChrome,
    faGithub,
    faWindows,
} from '@fortawesome/free-brands-svg-icons';

/**
 * List of all slides to be displayed.
 */
const slides: Slide[] = [
    // TODO: Add content
    // TODO: Add translations
    {
        title: 'infoSlide.hello.title',
        content: [
            {
                type: 'img',
                src: './assets/images/app-icon-cropped.png',
                alt: 'infoSlide.hello.appIconAlt',
                maxWidth: 250,
            },
            {
                type: 'text',
                text: [
                    'infoSlide.hello.content.welcome',
                    'infoSlide.hello.content.guide',
                    'infoSlide.hello.content.reopenable',
                ],
            },
        ],
        isOnboarding: true,
    },
    {
        title: 'infoSlide.aboutProject.title',
        content: [{ type: 'text', text: ['Content will be added soon.'] }],
    },
    {
        title: 'infoSlide.bluetoothConnection.title',
        content: [{ type: 'text', text: ['Content will be added soon.'] }],
    },
    {
        title: 'infoSlide.ui.title',
        alignLeft: true,
        content: [
            {
                type: 'text',
                text: [
                    'infoSlide.ui.content.simplicity',
                    'infoSlide.ui.content.materialSpa',
                ],
            },
            {
                type: 'text',
                text: [
                    'infoSlide.ui.content.composedOf',
                    '',
                    'infoSlide.ui.content.headerIntro',
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'mat-icon', icon: 'bluetooth' },
                    {
                        type: 'text',
                        text: ['infoSlide.ui.content.header.bluetooth'],
                    },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'mat-icon', icon: 'language' },
                    {
                        type: 'text',
                        text: ['infoSlide.ui.content.header.i18n'],
                    },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'mat-icon', icon: 'light_mode' },
                    {
                        type: 'text',
                        text: ['infoSlide.ui.content.header.themes'],
                    },
                    { type: 'mat-icon', icon: 'dark_mode' },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'mat-icon', icon: 'info_outline' },
                    {
                        type: 'text',
                        text: ['infoSlide.ui.content.header.info'],
                    },
                ],
            },
            {
                type: 'text',
                text: ['', 'infoSlide.ui.content.mainIntro'],
            },
            {
                type: 'listed',
                listedElements: [
                    'infoSlide.ui.content.main.notSupported',
                    'infoSlide.ui.content.main.pressToConnect',
                    'infoSlide.ui.content.main.connecting',
                    'infoSlide.ui.content.main.emittedValues',
                ],
            },
        ],
    },
    {
        title: 'infoSlide.compatibility.title',
        content: [
            {
                type: 'img',
                src: './assets/images/two-devices-frontend.png',
                alt: '',
                maxWidth: 600,
            },
            {
                type: 'text',
                text: ['infoSlide.compatibility.content.intro'],
            },
            {
                type: 'nested',
                fullWidthRow: true,
                nested: [
                    { type: 'icon', icon: faChrome },
                    {
                        type: 'text',
                        text: [
                            'infoSlide.compatibility.content.webBluetooth',
                            'infoSlide.compatibility.content.chromeOnly',
                        ],
                    },
                ],
            },
            {
                type: 'nested',
                nested: [
                    { type: 'icon', icon: faApple },
                    { type: 'icon', icon: faWindows },
                    { type: 'icon', icon: faAndroid },
                ],
            },
            {
                type: 'text',
                text: [
                    'infoSlide.compatibility.content.iosBleApps',
                    'infoSlide.compatibility.content.testedOs',
                ],
            },
        ],
    },
    {
        title: 'infoSlide.scope.title',
        content: [
            {
                type: 'img',
                src:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/HTW_Berlin_logo.svg/1024px-HTW_Berlin_logo.svg.png',
                alt: 'infoSlide.scope.htwLogoAlt',
                maxWidth: 400,
            },
            {
                type: 'text',
                text: [
                    'infoSlide.scope.content.p1',
                    'infoSlide.scope.content.p2',
                ],
            },
        ],
    },
    {
        title: 'infoSlide.repo.title',
        content: [
            {
                type: 'icon',
                icon: faGithub,
            },
            { type: 'text', text: ['infoSlide.repo.info'] },
            {
                type: 'nested',
                fullWidthRow: true,
                nested: [
                    {
                        type: 'link',
                        text: 'infoSlide.repo.tinyMl',
                        linkRef:
                            'https://github.com/maxkueh/tinyml_bird_classification/',
                    },
                    {
                        type: 'link',
                        text: 'infoSlide.repo.application',
                        linkRef:
                            'https://github.com/lucaslar/tinyml-bird-detection-bluetooth/',
                    },
                ],
            },
        ],
    },

    // TODO remove:
    // {
    //     title: 'placeholder.a',
    //     content: [
    //         {
    //             type: 'icon',
    //             icon: faKiwiBird,
    //         },
    //         {
    //             type: 'text',
    //             text: ['placeholder.b'],
    //         },
    //     ],
    //     isOnboarding: true,
    // },
    // {
    //     title: 'placeholder.a',
    //     content: [
    //         {
    //             type: 'icon',
    //             icon: faGithub,
    //         },
    //         {
    //             type: 'link',
    //             text: 'placeholder.b',
    //             linkRef:
    //                 'https://github.com/lucaslar/tinyml-bird-detection-bluetooth',
    //         },
    //     ],
    // },
    // {
    //     title: 'placeholder.b',
    //     content: [
    //         {
    //             type: 'img',
    //             src:
    //                 'https://images.pexels.com/photos/3067503/pexels-photo-3067503.jpeg?cs=srgb&dl=pexels-felipe-cespedes-3067503.jpg&fm=jpg',
    //             alt: 'placeholder.a',
    //         },
    //         {
    //             type: 'nested',
    //             nested: [
    //                 { type: 'text', text: ['placeholder.d', 'placeholder.c'] },
    //                 { type: 'text', text: ['placeholder.c', 'placeholder.c'] },
    //             ],
    //         },
    //         {
    //             type: 'nested',
    //             nested: [
    //                 {
    //                     type: 'img',
    //                     src:
    //                         'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?cs=srgb&dl=pexels-anna-shvets-4588052.jpg&fm=jpg',
    //                     alt: 'placeholder.a',
    //                 },
    //                 {
    //                     type: 'img',
    //                     src:
    //                         'https://images.pexels.com/photos/3726314/pexels-photo-3726314.jpeg?cs=srgb&dl=pexels-julissa-helmuth-3726314.jpg&fm=jpg',
    //                     alt: 'placeholder.a',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     title: 'placeholder.a',
    //     content: [
    //         { type: 'text', text: ['placeholder.c', 'placeholder.d'] },
    //         {
    //             type: 'img',
    //             src:
    //                 'https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?cs=srgb&dl=pexels-anna-shvets-4588047.jpg&fm=jpg',
    //             alt: 'placeholder.a',
    //         },
    //         {
    //             type: 'nested',
    //             nested: [
    //                 {
    //                     type: 'img',
    //                     src:
    //                         'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg',
    //                     alt: 'placeholder.b',
    //                 },
    //                 {
    //                     type: 'text',
    //                     text: ['placeholder.a', 'placeholder.c'],
    //                 },
    //             ],
    //         },
    //         {
    //             type: 'nested',
    //             nested: [
    //                 { type: 'icon', icon: faMicrochip },
    //                 {
    //                     type: 'text',
    //                     text: ['placeholder.d'],
    //                 },
    //             ],
    //         },
    //         {
    //             type: 'nested',
    //             nested: [
    //                 { type: 'icon', icon: faMicrochip },
    //                 { type: 'icon', icon: faKiwiBird },
    //                 { type: 'icon', icon: faBluetooth },
    //             ],
    //         },
    //     ],
    // },
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
    readonly content: (
        | Text
        | Image
        | Icon
        | Link
        | Listed
        | MatIcon
        | Nested
    )[];

    /**
     * True if the slide is only to be shown in onboarding context, false if not.
     */
    readonly isOnboarding?: boolean;

    /**
     * True if the content is to be left-aligned, false/undefined if not.
     */
    readonly alignLeft?: boolean;

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

    /**
     * Max width of the image.
     */
    readonly maxWidth?: number;
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

class Listed {
    /**
     * Content id
     */
    readonly type = 'listed';

    /**
     * Translation keys of the elements to be displayed.
     */
    readonly listedElements: string[];
}

class MatIcon {
    /**
     * Content id
     */
    readonly type = 'mat-icon';

    /**
     * Translation keys of the elements to be displayed.
     */
    readonly icon: string;
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
    readonly nested: (Text | Image | Icon | Link | MatIcon | Listed)[];

    /**
     * True if the content is to displayed in a full width row, false if the content is to be fitted in centered.
     */
    readonly fullWidthRow?: boolean;
}
