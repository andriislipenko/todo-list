import { Component, Input } from '@angular/core';
import { Weather } from '../entities/weather';

@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
    @Input() weather: Weather;
    @Input() isGeo: boolean;
    @Input() canRefresh: boolean;

    constructor() {}
}
