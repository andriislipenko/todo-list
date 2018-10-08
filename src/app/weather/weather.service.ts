import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { City } from './entities/city';
import { map } from 'rxjs/operators';
import { Weather } from './entities/weather';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { Coordinates } from './entities/coordinates';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private UNIT = 'metric';
    private API_KEY = '&APPID=965b3cabbaa3121b8043da6d5e373b79';
    private API_PREFIX = 'http://api.openweathermap.org/data/2.5/';
    private API_SUFIX = `&units=${this.UNIT}${this.API_KEY}`;
    private CITIES_INFO_URL = 'assets/current.city.list.min.json';

    public currentCityWeather: Weather = null;
    public currentTemperature = new Subject<number>();

    constructor(private http: HttpClient) {}

    public getCurrentTemperature(): Observable<number> {
        if (!this.currentCityWeather) {
            this.getWeatherByLocation();
        }

        return this.currentTemperature.asObservable();
    }

    public getWeatherByLocation(): Promise<Observable<any>> {
        return this.getPosition().then((position: Coordinates) => {
            const url = `${this.API_PREFIX}weather?lat=${position.lat}&lon=${position.lon}${this.API_SUFIX}`;

            const obs = this.http.get(url);
            obs.subscribe((weather: Weather) => {
                this.updateCurrentCityWeather(weather);
            });

            return obs;
        },
        (e: PositionError) => {
            throw new Error('You denied goelocation!!!');
        });
    }

    public getWeatherById(id: number): Observable<any> {
        const url = `${this.API_PREFIX}weather?id=${id}${this.API_SUFIX}`;

        const obs = this.http.get(url);
        obs.subscribe((weather: Weather) => {
            this.updateCurrentCityWeather(weather);
        });

        return obs;
    }

    public getFiveDaysForecastById(id: number): Observable<any> {
        const url = `${this.API_PREFIX}forecast?id=${id}${this.API_SUFIX}`;

        return this.http.get(url);
    }

    public searchCity(term: string): Observable<City[]> {
        term = term.toLowerCase();

        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<City[]>(this.CITIES_INFO_URL).pipe(
            map((city: City[]) => {
                return city.filter(
                    (c: City) => c.name.toLowerCase().indexOf(term) > -1
                );
            })
        );
    }

    private updateCurrentCityWeather(weather: Weather): void {
        this.currentCityWeather = weather;
        this.updateCurrentTemperature();
    }

    private updateCurrentTemperature(): void {
        this.currentTemperature.next(this.currentCityWeather.main.temp);
    }

    private getPosition(): Promise<Coordinates> {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(
                (pos: Position) => {
                    res({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                },
                (e: PositionError) => {
                    rej(e);
                }
            );
        });
    }
}
