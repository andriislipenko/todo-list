import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './entities/weather';
import { City } from './entities/city';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FiveDaysWeather } from './entities/five-days-weather';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherSearchEvent } from './entities/weather-search-event';
import { FiveDaysWeatherListItem } from './entities/five-days-weather-list-item';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
    public weather: Weather;
    public fiveDaysWeather: FiveDaysWeather;

    public city: City;
    public searchResults: City[];

    public errorMessage: string = null;
    constructor(private weatherService: WeatherService) {}

    ngOnInit() {
        this.getWeather();
    }

    public getWeather(): void {
        if (!this.weatherService.currentCityWeather) {
            this.getWeatherByLocation();
        } else {
            this.weather = this.weatherService.currentCityWeather;
            this.getFiveDaysForecastById(this.weather.id);
        }
    }

    public getWeatherByLocation() {
        this.weatherService
            .getWeatherByLocation()
            .then((obs: Observable<Weather>) => {
                obs.subscribe((weather: Weather) => {
                    this.weather = weather;
                    this.getFiveDaysForecastById(this.weather.id);
                },
                (e: Error) => {
                    this.errorMessage = 'Server not responding!!!';
                });
            })
            .catch((error: PositionError) => {
                this.errorMessage = error.message;
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

    public getWantedWeather(): void {
        if (!this.city.id) {
            return;
        }

        this.weatherService.getWeatherById(this.city.id).subscribe((weather: Weather) => {
            this.weather = weather;
            this.getFiveDaysForecastById(this.weather.id);
            this.errorMessage = null;
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

    private cutFiveDaysForecastList(): void {
        const count = this.fiveDaysWeather.cnt;

        this.fiveDaysWeather.list = this.fiveDaysWeather.list.filter(
            (el: FiveDaysWeatherListItem, index: number) => {
                return (index + 1) % Math.round(count / 5) === 0;
            }
        );
    }
}
