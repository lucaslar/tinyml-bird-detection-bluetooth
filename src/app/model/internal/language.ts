/**
 * Class representing a language the application is translated in.
 */
export class Language {
    /**
     * @param id Language id, e.g. "en" for English.
     * @param name Name of the language (untranslated), e.g. "Español" for Spanish.
     * @param flagIso ISO code of the region the language belongs to, e.g. "BR" for Brazilian Portuguese
     *        (only important for the displayed flag).
     */
    constructor(
        public readonly id: string,
        public readonly name: string,
        private readonly flagIso?: string
    ) {}

    /**
     * Path to the language's flag SVG.
     */
    get flagPath(): string {
        return `./assets/i18n/flags/${this.flagIso ?? this.id}.svg`;
    }
}
