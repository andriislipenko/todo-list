import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherDate'
})
export class WeatherDatePipe implements PipeTransform {

    transform(value: string): string {
        return new Date(+value * 1000).toLocaleString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
      }

}
