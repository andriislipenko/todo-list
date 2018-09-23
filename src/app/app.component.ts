import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo/todo.service';
import { WeatherService } from './weather/weather.service';
import { Weather } from './weather/weather';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ToDo + Weather';
    todoLabel: string;
    weatherLabel: string;
    temp: number;
    constructor(
        private router: Router,
        private todoService: TodoService,
        private weatherService: WeatherService
    ) {
        this.todoLabel = `To Do: `;
        this.weatherLabel = `Weather: `;
    }

    ngOnInit() {
        this.getCurrentWeather();
    }

    toTodo(): void {
        this.router.navigateByUrl('/todo');
    }
    toWeather(): void {
        this.router.navigateByUrl('/weather');
    }

    getCurrentWeather() {
        this.weatherService.getWeatherByLocation().then((obs) => {
            obs.subscribe(wthr => {
                this.temp = wthr.main.temp;
            });
        });
    }
}
