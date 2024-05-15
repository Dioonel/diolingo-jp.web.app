import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration } from 'date-fns';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const duration = intervalToDuration({ start: 0, end: value * 1000 });
    let formattedTime = '';

    if (duration.days) {
      duration.hours = (duration.hours || 0) + duration.days * 24;
    }

    if (duration.hours) {
      formattedTime += `${duration.hours} hour${duration.hours > 1 ? 's' : ''} `;
    }

    if (duration.minutes) {
      if(formattedTime.length > 0) formattedTime += 'and ';
      formattedTime += `${duration.minutes} minute${duration.minutes > 1 ? 's' : ''} `;
    }

    if (duration.seconds && !duration.hours) {
      if(formattedTime.length > 0) formattedTime += 'and ';
      formattedTime += `${duration.seconds} second${duration.seconds > 1 ? 's' : ''} `;
    }

    return formattedTime.trim();
  }
}
