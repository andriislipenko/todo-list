import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather, FiveDaysWeather } from './weather';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather: Weather;
    fiveDaysWeather: FiveDaysWeather = new FiveDaysWeather();
    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.getWeatherByLocation();
    }

    getWeatherByLocation() {
        this.weatherService.getWeatherByLocation().then((obs) => {
            obs.subscribe(wthr => {
                this.weather = wthr;

                this.getFiveDaysForecastById(this.weather.id);
            });
        });
    }

    getFiveDaysForecastById(id: number) {
        this.weatherService.getFiveDaysForecastById(id).subscribe(wthr => {
            this.fiveDaysWeather = wthr;
            this.cutFiveDaysForecastList();
        });
    }

    private cutFiveDaysForecastList() {
        this.fiveDaysWeather.list = this.fiveDaysWeather.list.filter((el, i) => {
            return (i + 1) % 9 === 0 || i === 0;
        });
    }
}
