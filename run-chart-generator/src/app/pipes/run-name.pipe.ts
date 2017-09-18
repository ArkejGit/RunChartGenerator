import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'runName',
})
export class RunNamePipe implements PipeTransform {
    transform(value: string):string {
        return value.match(/[^/]*$/)[0].slice(0, -4);
    }
}