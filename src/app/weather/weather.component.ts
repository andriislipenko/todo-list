import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather, FiveDaysWeather } from './weather';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather: Weather;

    weather$: Observable<string>;
    private searchStr = new Subject<string>();

    fiveDaysWeather: FiveDaysWeather = new FiveDaysWeather();
    constructor(
        private route: ActivatedRoute,
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
            this.getWeatherById(id);
        } else {
            this.getWeatherByLocation();
        }
    }

    getWeatherByLocation() {
        this.weatherService.getWeatherByLocation().then((obs) => {
            obs.subscribe(wthr => {
                this.weather = wthr;

                this.getFiveDaysForecastById(this.weather.id);
            });
        });
    }

    getWeatherById(id: number) {
        this.weatherService.getWeatherById(id).subscribe(wthr => {
            this.weather = wthr;

            this.getFiveDaysForecastById(this.weather.id);
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
