import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByValue',
    pure: false,
})
export class SortByValuePipe implements PipeTransform {
    // TODO: Typify / comment
    transform<T>(values: T[]): T[] {
        return values.sort((a, b) => (b as any).value - (a as any).value);
    }
}
