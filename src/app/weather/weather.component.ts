import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather, FiveDaysWeather } from './weather';
import { Subject, Observable } from 'rxjs';
import { City } from './city';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather: Weather;

    cities$: Observable<City[]>;
    private searchTerms = new Subject<string>();

    city: City;
    searchResults: City[];

    fiveDaysWeather: FiveDaysWeather = new FiveDaysWeather();
    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.getWeather();

        this.cities$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.weatherService.searchCity(term))
        );
    }

    getWeather() {
        if (!this.weatherService.currentCityWeather) {
            this.getWeatherByLocation();
        } else {
            this.weather = this.weatherService.currentCityWeather;

            this.getFiveDaysForecastById(this.weather.id);
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

    search(e): void {
        this.searchTerms.next(e.query);
        this.cities$.subscribe(cities => {
            this.searchResults = cities;

            this.searchResults.forEach(e => e.name += ' ' + e.country);
            console.log(this.searchResults);
        });
    }

    getWantedWeather() {
        this.weatherService.getWeatherById(this.city.id).subscribe(wthr => {
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
