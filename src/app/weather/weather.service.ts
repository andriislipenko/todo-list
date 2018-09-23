import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { City } from './city';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    static DEFAULT_LAT = 51.50853;
    static DEFAULT_LON = -0.12574;
    static UNIT = 'metric';
    static API_PREFIX = 'http://api.openweathermap.org/data/2.5/';
    static API_SUFIX = `&units=${WeatherService.UNIT}&APPID=c97bbde2af8f0585a694dc2139aa1355`;

    static CITIES_INFO_URL = 'assets/current.city.list.min.json';

    constructor(
        private http: HttpClient
    ) { }

    getWeatherByLocation(): Promise<Observable<any>> {
        return this.getPosition().then(position => {
            const url =
                `${WeatherService.API_PREFIX}weather?lat=${position.lat}&lon=${position.lon}${WeatherService.API_SUFIX}`;

            return this.http.get(url);
         });
    }

    getWeatherById(id: number): Observable<any> {
        const url = `${WeatherService.API_PREFIX}weather?id=${id}${WeatherService.API_SUFIX}`;

        return this.http.get(url);
    }

    getFiveDaysForecastById(id: number): Observable<any> {
        const url = `${WeatherService.API_PREFIX}forecast?id=${id}${WeatherService.API_SUFIX}`;

        return this.http.get(url);
    }

    getPosition(): Promise<{ lat: number, lon: number }> {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                res({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            },
            e => {
                res({ lat: WeatherService.DEFAULT_LAT, lon: WeatherService.DEFAULT_LON });
            });
        });
    }

    searchCity(term: string): Observable<City[]> {
        term = term.toLowerCase();

        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<City[]>(WeatherService.CITIES_INFO_URL).pipe(
            map((city) => {
                return city.filter((c: City, i, a) => c.name.toLowerCase().indexOf(term) > -1);
            })
        );
    }
}
