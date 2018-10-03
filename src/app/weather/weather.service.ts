import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { City } from './city';
import { map } from 'rxjs/operators';
import { Weather } from './weather';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly DEFAULT_LAT = 51.50853;
  private readonly DEFAULT_LON = -0.12574;
  private UNIT = 'metric';
  private API_PREFIX = 'http://api.openweathermap.org/data/2.5/';
  private API_SUFIX = `&units=${
    this.UNIT
  }&APPID=c97bbde2af8f0585a694dc2139aa1355`;
  private CITIES_INFO_URL = 'assets/current.city.list.min.json';

  public currentCityWeather: Weather;

  constructor(private http: HttpClient) {}

  public getWeatherByLocation(): Promise<Observable<any>> {
    return this.getPosition().then(position => {
      const url = `${this.API_PREFIX}weather?lat=${position.lat}&lon=${
        position.lon
      }${this.API_SUFIX}`;

      const obs = this.http.get(url);
      obs.subscribe((wthr: Weather) => {
        this.currentCityWeather = wthr;
      });

      return obs;
    });
  }

  public getWeatherById(id: number): Observable<any> {
    const url = `${this.API_PREFIX}weather?id=${id}${this.API_SUFIX}`;

    const obs = this.http.get(url);
    obs.subscribe((wthr: Weather) => {
      this.currentCityWeather = wthr;
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
      map(city => {
        return city.filter(
          (c: City, i, a) => c.name.toLowerCase().indexOf(term) > -1
        );
      })
    );
  }

  private getPosition(): Promise<{ lat: number; lon: number }> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          res({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        e => {
          res({ lat: this.DEFAULT_LAT, lon: this.DEFAULT_LON });
        }
      );
    });
  }
}
