import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { City } from './entities/city';
import { Weather } from './entities/weather';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { Coordinates } from './entities/coordinates';
import { from } from 'rxjs/internal/observable/from';
import { catchError } from 'rxjs/internal/operators/catchError';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { FiveDaysWeather } from './entities/five-days-weather';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private UNIT = 'metric';
    private API_KEY = '&APPID=965b3cabbaa3121b8043da6d5e373b79';
    private API_PREFIX = 'https://api.openweathermap.org/data/2.5/';
    private API_SUFIX = `&units=${this.UNIT}${this.API_KEY}`;
    private CITIES_INFO_URL = 'assets/current.city.list.min.json';

    private _currentLocalWeather: Weather = null;
    private _currentCityWeather: Weather = null;
    private _currentFiveDaysWeather: FiveDaysWeather = null;

    public currentTemperature = new Subject<number>();

    constructor(private http: HttpClient) {}

    public getWeatherByLocation(): Observable<any> {
        if (this.currentLocalWeather && !this.isHourPassed(this.currentLocalWeather.dt * 1000)) {
            this.updateCurrentTemperature(this.currentLocalWeather.main.temp);
            return of(this.currentLocalWeather);
        }

        return from(this.getPosition()).pipe(
            catchError((e: PositionError) => {
                throw new Error('You denied goelocation!!!');
            }),
            switchMap((position: Coordinates) => {
                return this.requestLocalWeather(position).pipe(
                    tap((weather: Weather) => {
                        this.currentLocalWeather = weather;
                        this.updateCurrentTemperature(this.currentLocalWeather.main.temp);

                        this.currentCityWeather = null;
                    })
                );
            })
        );
    }

    public getWeatherById(id: number): Observable<Weather> {
        if (this.currentCityWeather &&
            this.currentCityWeather.id === id &&
            !this.isHourPassed(this.currentCityWeather.dt * 1000)
        ) {
            this.updateCurrentTemperature(this.currentCityWeather.main.temp);
            return of(this.currentCityWeather);
        }

        return this.requestWeatherById(id).pipe(
            tap((weather: Weather) => {
                this.currentCityWeather = weather;
                this.updateCurrentTemperature(this.currentCityWeather.main.temp);
                this.currentLocalWeather = null;
            })
        );

    }

    public getFiveDaysForecastById(id: number): Observable<any> {
        return this.http.get(`${this.API_PREFIX}forecast?id=${id}${this.API_SUFIX}`).pipe(
            tap((weather: FiveDaysWeather) => {
                this.currentFiveDaysWeather = weather;
            })
        );
    }

    public searchCity(term: string): Observable<City[]> {
        term = term.toLowerCase().trim();

        if (!term) {
            return of([]);
        }

        return this.requestCitiesInfo().pipe(
            map((city: City[]) => {
                return city.filter(
                    (c: City) => c.name.toLowerCase().indexOf(term) > -1
                );
            })
        );
    }

    public searchCityById(id: number): Observable<City> {
        return this.requestCitiesInfo().pipe(
            map((city: City[]) => {
                return city.find(
                    (c: City) => c.id === id
                );
            })
        );
    }

    public getCurrentTemperature(): Observable<number> {
        if (!this.currentCityWeather && !this.currentLocalWeather) {
            this.getWeatherByLocation().subscribe((weather: Weather) => {
                this.updateCurrentTemperature(weather.main.temp);
            });
        }

        return this.currentTemperature.asObservable();
    }

    private requestLocalWeather(position: Coordinates): Observable<Weather> {
        return this.http.get<Weather>(
            `${this.API_PREFIX}weather?lat=${position.lat}&lon=${position.lon}${
                this.API_SUFIX
            }`
        );
    }

    private requestWeatherById(id: number): Observable<any> {
        return this.http.get(`${this.API_PREFIX}weather?id=${id}${this.API_SUFIX}`);
    }

    private requestCitiesInfo(): Observable<City[]> {
        return this.http.get<City[]>(this.CITIES_INFO_URL);
    }

    private updateCurrentTemperature(temperature: number): void {
        this.currentTemperature.next(temperature);
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

    private isHourPassed(miliseconds: number): boolean {
        return (new Date().getTime() - miliseconds) > (1000 * 60 * 60);
    }

    set currentLocalWeather(weather: Weather) {
        this._currentLocalWeather = weather;
        localStorage.setItem('currentLocalWeather', JSON.stringify(this._currentLocalWeather));
    }

    get currentLocalWeather(): Weather {
        const localWeatherString = localStorage.getItem('currentLocalWeather');
        if (!localWeatherString) {
            return null;
        }
        this._currentLocalWeather = JSON.parse(localWeatherString);
        return this._currentLocalWeather;
    }

    set currentCityWeather(weather: Weather) {
        this._currentCityWeather = weather;
        localStorage.setItem('currentCityWeather', JSON.stringify(this._currentCityWeather));
    }

    get currentCityWeather(): Weather {
        const cityWeatherString = localStorage.getItem('currentCityWeather');
        if (!cityWeatherString) {
            return null;
        }
        this._currentCityWeather = JSON.parse(cityWeatherString);
        return this._currentCityWeather;
    }

    set currentFiveDaysWeather(weather: FiveDaysWeather) {
        this._currentFiveDaysWeather = weather;
        localStorage.setItem('currentFiveDaysWeather', JSON.stringify(this._currentFiveDaysWeather));
    }

    get currentFiveDaysWeather(): FiveDaysWeather {
        const fiveDaysWeatherString = localStorage.getItem('currentFiveDaysWeather');
        if (!fiveDaysWeatherString) {
            return null;
        }
        this._currentFiveDaysWeather = JSON.parse(fiveDaysWeatherString);
        return this._currentFiveDaysWeather;
    }
}
