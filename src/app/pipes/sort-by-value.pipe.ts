import { Pipe, PipeTransform } from '@angular/core';
import { BirdCharacteristic } from '../model/bird-characteristic';

/**
 * Pipe for sorting results received via Bluetooth.
 */
@Pipe({
    name: 'sortByValue',
    pure: false,
})
export class SortByValuePipe implements PipeTransform {
    /**
     * @param values Values to be sorted.
     * @returns Results sorted by value (ascending order).
     */
    transform(values: BirdCharacteristic[]): BirdCharacteristic[] {
        return values.sort((a, b) => b.value - a.value);
    }
}
