import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateDate'
})
export class FormateDatePipe implements PipeTransform {

  transform(value: string): string {
    return new Date(value).toLocaleString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
  }

}
