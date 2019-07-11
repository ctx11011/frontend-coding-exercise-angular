import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value);
    return [
      `0${date.getDate()}`.slice(-2),
      `-`,
      `0${(date.getMonth() + 1)}`.slice(-2),
      `-`,
      date.getFullYear()
    ].join('');
  }

}
