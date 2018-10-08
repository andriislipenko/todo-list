import { Component, Input } from '@angular/core';
import { FiveDaysWeather } from '../entities/five-days-weather';

@Component({
    selector: 'app-five-days-weather',
    templateUrl: './five-days-weather.component.html',
    styleUrls: ['./five-days-weather.component.scss']
})
export class FiveDaysWeatherComponent {
    @Input() fiveDaysWeather: FiveDaysWeather = null;
}
