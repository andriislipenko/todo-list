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
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
    public weather: Weather;
    private _fiveDaysWeather: FiveDaysWeather;

    public city: City = new City();
    public searchResults: City[];

    public isGeo: boolean = false;
    public canRefresh: boolean = true;
    public errorMessage: string = null;

    constructor(
        private weatherService: WeatherService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Weather');
        this.getWeather();
    }

    public getWeather(): void {
        if (this.weatherService.currentCityWeather) {
            this.getWeatherById(this.weatherService.currentCityWeather.id);
            this.getCurrentCity();
            return;
        }

        this.getWeatherByLocation();
    }

    public getWeatherByLocation(): void {
        this.weatherService
            .getWeatherByLocation()
            .pipe(
                catchError(
                    (e: Error, caught: Observable<{}>): ObservableInput<{}> => {
                        this.errorMessage = e.message;
                        return of(e);
                    }
                )
            )
            .subscribe((weather: Weather) => {
                this.weather = weather;
                this.getFiveDaysForecastById(this.weather.id);
                this.isGeo = true;
                this.city = null;
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

    public getFiveDaysForecastById(id: number): void {
        this.weatherService
            .getFiveDaysForecastById(id)
            .subscribe((weather: FiveDaysWeather) => {
                this.fiveDaysWeather = weather;
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

    public refresh(): void {
        this.weatherService.getFreshWeather().subscribe((weather: Weather) => {
            this.weather = weather;
            this.getFiveDaysForecastById(this.weather.id);
        });

        this.canRefresh = false;
        setTimeout(() => this.canRefresh = true, 1000 * 60);
    }

    private getCurrentCity(): void {
        this.weatherService.searchCityById(this.weatherService.currentCityWeather.id).subscribe((city: City) => {
            this.city = city;
            this.city.name = `${this.city.name} ${this.city.country}`;
        });
    }

    set fiveDaysWeather(weather: FiveDaysWeather) {
        this._fiveDaysWeather = weather;
        this.cutFiveDaysForecastList();
    }

    get fiveDaysWeather(): FiveDaysWeather {
        return this._fiveDaysWeather;
    }

    private cutFiveDaysForecastList(): void {
        const count = this._fiveDaysWeather.cnt;

        this._fiveDaysWeather.list = this._fiveDaysWeather.list.filter(
            (el: FiveDaysWeatherListItem, index: number) => {
                return (index + 1) % Math.floor(count / 5) === 0;
            }
        );
    }
}
