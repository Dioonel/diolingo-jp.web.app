import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatArray',
  standalone: true
})
export class FormatArrayPipe implements PipeTransform {

  transform(value: any): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }

}
