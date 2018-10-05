import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather, FiveDaysWeather } from './weather';
import { City } from './city';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  public getWeather() {
    if (!this.weatherService.currentCityWeather) {
      this.getWeatherByLocation();
    } else {
      this.weather = this.weatherService.currentCityWeather;
      this.getFiveDaysForecastById(this.weather.id);
    }
  }

  getWeatherByLocation() {
    this.weatherService.getWeatherByLocation().then(obs => {
      obs.subscribe(weather => {
        this.weather = weather;
        this.getFiveDaysForecastById(this.weather.id);
      });
    }).catch((error: PositionError) => {
        this.errorMessage = error.message;
    });
  }

  search(e): void {
    this.weatherService
      .searchCity(e.query)
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

  getWantedWeather() {
    if (!this.city.id) {
      return;
    }
    this.weatherService.getWeatherById(this.city.id).subscribe(wthr => {
      this.weather = wthr;
      this.getFiveDaysForecastById(this.weather.id);
      this.errorMessage = null;
    });
  }

  getFiveDaysForecastById(id: number) {
    this.weatherService.getFiveDaysForecastById(id).subscribe((wthr: FiveDaysWeather) => {
      this.fiveDaysWeather = wthr;
      this.cutFiveDaysForecastList();
    });
  }

  private cutFiveDaysForecastList() {
    const count = this.fiveDaysWeather.cnt;

    this.fiveDaysWeather.list = this.fiveDaysWeather.list.filter((el, index) => {
      return (index + 1) % Math.round(count / 5) === 0 || index === 0;
    });
  }
}
