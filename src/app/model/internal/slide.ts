import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faAndroid,
    faApple,
    faBluetoothB,
    faChrome,
    faGithub,
    faWindows,
} from '@fortawesome/free-brands-svg-icons';
import {
    faEllipsisH,
    faMicrochip,
    faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';

/**
 * List of all slides to be displayed.
 */
const slides: Slide[] = [
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
        content: [
            {
                type: 'img',
                src: './assets/images/app-concept-sketch.png',
                alt: 'infoSlide.aboutProject.imgAlt',
                maxWidth: 600,
            },
            {
                type: 'text',
                text: ['infoSlide.aboutProject.content'],
            },
        ],
    },
    {
        title: 'infoSlide.bluetoothConnection.title',
        content: [
            {
                type: 'nested',
                nested: [
                    { type: 'icon', icon: faMicrochip },
                    { type: 'icon', icon: faEllipsisH },
                    { type: 'icon', icon: faBluetoothB },
                    { type: 'icon', icon: faEllipsisH },
                    { type: 'icon', icon: faMobileAlt },
                ],
            },
            {
                type: 'text',
                text: ['infoSlide.bluetoothConnection.content.webBluetooth'],
            },
            {
                type: 'nested',
                fullWidthRow: true,
                alignLeft: true,
                nested: [
                    { type: 'mat-icon', icon: 'bluetooth_disabled' },
                    {
                        type: 'text',
                        text: [
                            'infoSlide.bluetoothConnection.content.state.disabled',
                        ],
                    },
                ],
            },
            {
                type: 'nested',
                fullWidthRow: true,
                alignLeft: true,
                nested: [
                    { type: 'mat-icon', icon: 'bluetooth' },
                    {
                        type: 'text',
                        text: [
                            'infoSlide.bluetoothConnection.content.state.enabled',
                        ],
                    },
                ],
            },
            {
                type: 'nested',
                fullWidthRow: true,
                alignLeft: true,
                nested: [
                    { type: 'mat-icon', icon: 'bluetooth_searching' },
                    {
                        type: 'nested',
                        isColumn: true,
                        alignLeft: true,
                        nested: [
                            {
                                type: 'text',
                                noMb: true,
                                text: [
                                    'infoSlide.bluetoothConnection.content.state.connecting',
                                ],
                            },
                            {
                                type: 'listed',
                                listedElements: [
                                    'infoSlide.bluetoothConnection.content.state.connectingTec.request',
                                    'infoSlide.bluetoothConnection.content.state.connectingTec.select',
                                    'infoSlide.bluetoothConnection.content.state.connectingTec.connect',
                                    'infoSlide.bluetoothConnection.content.state.connectingTec.listen',
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'nested',
                fullWidthRow: true,
                alignLeft: true,
                nested: [
                    { type: 'mat-icon', icon: 'bluetooth_connected' },
                    {
                        type: 'text',
                        text: [
                            'infoSlide.bluetoothConnection.content.state.connected',
                        ],
                    },
                ],
            },
        ],
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
                    { type: 'mat-icon', icon: 'dark_mode' },
                    {
                        type: 'text',
                        text: ['infoSlide.ui.content.header.themes'],
                    },
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
                alt: 'infoSlide.compatibility.imgAlt',
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

    /**
     * True if no margin is to be shown below the text, false/undefined if not.
     */
    readonly noMb?: boolean;
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
    readonly nested: (Text | Image | Icon | Link | MatIcon | Listed | Nested)[];

    /**
     * True if the content is to be displayed as a column, false/undefined if not.
     */
    readonly isColumn?: boolean;

    /**
     * True if the content is to be aligned left, false/undefined if not.
     */
    readonly alignLeft?: boolean;

    /**
     * True if the content is to displayed in a full width row, false if the content is to be fitted in centered.
     */
    readonly fullWidthRow?: boolean;
}
