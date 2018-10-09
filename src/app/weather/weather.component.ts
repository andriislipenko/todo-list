import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './entities/weather';
import { City } from './entities/city';

import { FiveDaysWeather } from './entities/five-days-weather';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherSearchEvent } from './entities/weather-search-event';
import { FiveDaysWeatherListItem } from './entities/five-days-weather-list-item';
import { ObservableInput } from 'rxjs/internal/types';
import { catchError } from 'rxjs/internal/operators/catchError';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
    public weather: Weather;
    public fiveDaysWeather: FiveDaysWeather;

    public city: City = new City();
    public searchResults: City[];

    public isGeo = false;
    public errorMessage: string = null;

    constructor(private weatherService: WeatherService) {}

    ngOnInit() {
        this.getWeather();
    }

    public getWeather(): void {
        if (!this.weatherService.currentCityWeather) {
            this.getWeatherByLocation();
        } else {
            this.getWeatherById(this.weatherService.currentCityWeather.id);
            this.getCurrentCity();
        }
    }

    public getWeatherByLocation(): void {
        this.weatherService
            .getWeatherByLocation()
            .pipe(
                catchError(
                    (e: any, caught: Observable<{}>): ObservableInput<{}> => {
                        this.errorMessage = e.message;
                        return e;
                    }
                )
            )
            .subscribe((weather: Weather) => {
                this.weather = weather;
                this.getFiveDaysForecastById(this.weather.id);
                this.isGeo = true;
            });
    }

    public getWeatherById(id: number): void {
        this.weatherService.getWeatherById(id).pipe(
            catchError(
                (e: any, caught: Observable<{}>): ObservableInput<{}> => {
                    this.errorMessage = e.message;
                    return e;
        })).subscribe((weather: Weather) => {
            this.weather = weather;
            this.getFiveDaysForecastById(this.weather.id);
            this.isGeo = false;
            this.errorMessage = null;
        });
    }

    public search(event: WeatherSearchEvent): void {
        this.weatherService
            .searchCity(event.query)
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((cities: City[]) => {
                this.searchResults = cities;
                this.searchResults = this.searchResults.map((item: City) => {
                    item.name = `${item.name} ${item.country}`;
                    return item;
                });
            });
    }

    public getFiveDaysForecastById(id: number): void {
        this.weatherService
            .getFiveDaysForecastById(id)
            .subscribe((weather: FiveDaysWeather) => {
                this.fiveDaysWeather = weather;
                this.cutFiveDaysForecastList();
            });
    }

    private getCurrentCity(): void {
        this.weatherService.searchCityById(this.weatherService.currentCityWeather.id).subscribe((city: City) => {
            this.city = city;
            this.city.name = `${this.city.name} ${this.city.country}`;
        });
    }

    private cutFiveDaysForecastList(): void {
        const count = this.fiveDaysWeather.cnt;

        this.fiveDaysWeather.list = this.fiveDaysWeather.list.filter(
            (el: FiveDaysWeatherListItem, index: number) => {
                return (index + 1) % Math.round(count / 5) === 0;
            }
        );
    }
}
