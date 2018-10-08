import { Component, OnInit } from '@angular/core';
import { FiveDaysWeather } from '../entities/five-days-weather';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'app-five-days-weather',
    templateUrl: './five-days-weather.component.html',
    styleUrls: ['./five-days-weather.component.scss']
})
export class FiveDaysWeatherComponent implements OnInit {
    public fiveDaysWeather: FiveDaysWeather = null;

    constructor(private weatherService: WeatherService) {}

    ngOnInit() {
        this.getFiveDaysWeather();
    }

    public getFiveDaysWeather(): void {
        if (!this.weatherService.currentCityWeather) {
            return;
        }

        const id = this.weatherService.currentCityWeather.id;
        this.weatherService.getFiveDaysForecastById(id).subscribe((weather: FiveDaysWeather) => {
            this.fiveDaysWeather = weather;
            this.toFiveDaysList();
        });
    }

    private toFiveDaysList() {
        const count = this.fiveDaysWeather.cnt;

        this.fiveDaysWeather.list = this.fiveDaysWeather.list.filter(
            (el, index) => {
                return (index + 1) % Math.round(count / 5) === 0;
            }
        );
    }
}
