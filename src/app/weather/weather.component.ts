import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather: Object;
    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.getCurrentWeatherByLocation();
    }

    getCurrentWeatherByLocation() {
        this.weatherService.getCurrentWeatherByLocation().then((obs) => {
            obs.subscribe(wthr => this.weather = wthr);
        });
    }

}
