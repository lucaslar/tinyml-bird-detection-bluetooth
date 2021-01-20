/**
 * Class representing a characteristic used for communicating between microcontroller and web Bluetooth device.
 */
export class BirdCharacteristic {
    /**
     * List of supported characteristics for bird detection incl. uuid and translation key.
     */
    static readonly characteristics: BirdCharacteristic[] = [
        {
            uuid: 'afea4db0-1ef6-4653-bb67-aa14b4d804bb',
            translationKey: 'great_tit',
        },
        {
            uuid: 'a950cb51-4b4e-45ed-9c5b-44dc101e57ed',
            translationKey: 'merl',
        },
        {
            uuid: '841760cc-c842-4d1b-994d-972fcae34e88',
            translationKey: 'sparrow',
        },
    ];

    /**
     * The characteristic's UUID.
     */
    uuid: string;

    /**
     * Key for translating the name of the characteristic.
     */
    translationKey: string;

    /**
     * Last emitted value.
     */
    value?: number;

    /**
     * True if currently connected, false if not.
     */
    isReady?: boolean;
}
