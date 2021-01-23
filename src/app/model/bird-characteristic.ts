/**
 * Class representing a characteristic used for communicating between microcontroller and web Bluetooth device.
 */
export class BirdCharacteristic {
    /**
     * List of supported characteristics for bird detection incl. uuid and translation key.
     */
    static readonly characteristics: BirdCharacteristic[] = [
        {
            translationKey: 'characteristic.noise',
            uuid: 'a58975f8-0fe3-40e5-af04-fedf80cba2a7',
            opacity: 0.4,
        },
        {
            translationKey: 'characteristic.unknown',
            uuid: '4ae2b158-458d-48db-8c21-e3f9fc00958f',
            opacity: 0.4,
        },
        {
            translationKey: 'characteristic.parusmajor',
            uuid: '408e957f-43d5-4486-9899-9de940b8de93',
        },
        {
            translationKey: 'characteristic.turdusmerula',
            uuid: '74fdd9b2-aa8b-4418-b6ea-e8ba03e701df',
        },
        {
            translationKey: 'characteristic.passerdomesticus',
            uuid: 'd7417ec3-dcf3-4baa-8ca8-c92670d555c1',
        },
        {
            translationKey: 'characteristic.phylloscopuscollybita',
            uuid: 'ce38bf27-669b-43d4-9a00-4d6545fac12a',
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
     * Opacity the characteristic is to be displayed with.
     */
    opacity?: number = 1;

    /**
     * Last emitted value.
     */
    value?: number;

    /**
     * True if currently connected, false if not.
     */
    isReady?: boolean;
}
