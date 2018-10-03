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
  weather: Weather;
  fiveDaysWeather: FiveDaysWeather;

  city: City;
  searchResults: City[];
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  public getWeather() {
    if (!this.weatherService.currentCityWeather) {
      this.getWeatherByLocation();
      this.getFiveDaysForecastById(this.weather.id);
    } else {
      this.weather = this.weatherService.currentCityWeather;
      this.getFiveDaysForecastById(this.weather.id);
    }
  }

  getWeatherByLocation() {
    this.weatherService.getWeatherByLocation().then(obs => {
      obs.subscribe(wthr => {
        this.weather = wthr;
      });
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
    console.log(this.city);
    if (!this.city.id) {
      return;
    }
    this.weatherService.getWeatherById(this.city.id).subscribe(wthr => {
      this.weather = wthr;
      this.getFiveDaysForecastById(this.weather.id);
    });
  }

  getFiveDaysForecastById(id: number) {
    this.weatherService.getFiveDaysForecastById(id).subscribe((wthr: FiveDaysWeather) => {
      this.fiveDaysWeather = wthr;
      this.cutFiveDaysForecastList();
    });
  }

  private cutFiveDaysForecastList() {
    this.fiveDaysWeather.list = this.fiveDaysWeather.list.filter((el, index) => {
      return (index + 1) % 9 === 0 || index === 0;
    });
  }
}
