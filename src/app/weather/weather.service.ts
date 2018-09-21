import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    static DEFAULT_LAT = 51.5;
    static DEFAULT_LON = 0;
    static UNIT = 'metric';

    constructor(
        private http: HttpClient
    ) { }

    getCurrentWeatherByLocation(): Promise<Observable<any>> {
        return this.getPosition().then(position => {
            const url =
                // tslint:disable-next-line:max-line-length
                `http://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&units=${WeatherService.UNIT}&APPID=40e6b7f3899d5acb2866b82528a1dfa5`;

            return this.http.get(url);
        });
    }

    getPosition(): Promise<{ lat: number, lon: number }> {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                res({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            });
        });
    }
}
