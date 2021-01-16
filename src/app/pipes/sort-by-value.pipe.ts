import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe for sorting results received via Bluetooth.
 */
@Pipe({
    name: 'sortByValue',
    pure: false,
})
export class SortByValuePipe implements PipeTransform {
    // TODO: Typify

    /**
     * @param values Values to be sorted.
     * @returns Results sorted by value (ascending order).
     */
    transform<T>(values: T[]): T[] {
        return values.sort((a, b) => (b as any).value - (a as any).value);
    }
}
