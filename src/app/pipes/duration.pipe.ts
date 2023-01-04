import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(seconds: number): string {

    // long way

    // const date = new Date(null);
    // date.setSeconds(seconds); // specify value for seconds here
    // const result = date.toISOString().slice(11, 19);


    // short way
    // new Date(seconds * 1000).toISOString().slice(12, 19);

    const date = new Date(seconds * 1000).toISOString().slice(12, 19).split('');

    const isHourInString = date.at(0) === '1';

    if (isHourInString) {
      return date.join('');
    } else {
      return date.slice(2, date.length).join('');
    }
  }

}
