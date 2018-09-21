import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    static DEFAULT_LAT = 51.5;
    static DEFAULT_LON = 0;
    static UNIT = 'metric';
    static API_PREFIX = 'http://api.openweathermap.org/data/2.5/';
    static API_SUFIX = `&units=${WeatherService.UNIT}&APPID=c97bbde2af8f0585a694dc2139aa1355`;

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
}
