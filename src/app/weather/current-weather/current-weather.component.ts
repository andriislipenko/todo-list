import { Component, Input } from '@angular/core';
import { Weather } from '../entities/weather';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
    @Input() weather: Weather;

    constructor() {}
}
