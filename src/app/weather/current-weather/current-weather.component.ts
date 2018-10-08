import { Component, OnInit } from '@angular/core';
import { Weather } from '../entities/weather';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
    public weather: Weather;
    public errorMessage: string = null;

    constructor(private weatherService: WeatherService) {}

    ngOnInit() {
        this.getCurrentWeather();
    }

    public getCurrentWeather(): void {
        if (!this.weatherService.currentCityWeather) {
            this.getWeatherByLocation();
        } else {
            this.weather = this.weatherService.currentCityWeather;
        }
    }

    public getWeatherByLocation(): void {
        this.weatherService.getWeatherByLocation().then((obs: Observable<Weather>) => {
          obs.subscribe((weather: Weather) => {
            this.weather = weather;
          });
        }).catch((error: PositionError) => {
            this.errorMessage = error.message;
        });
      }
}
