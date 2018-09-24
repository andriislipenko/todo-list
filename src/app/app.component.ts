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
    todoLabel = 'To Do: ';
    weatherLabel = 'Weather: ';

    constructor(
        private router: Router,
        private todoService: TodoService,
        private weatherService: WeatherService
    ) {}

    ngOnInit() {
        this.weatherService.getWeatherByLocation();
        this.todoService.getTodoList();
    }

    toTodo(): void {
        this.router.navigateByUrl('/todo');
    }

    toWeather(): void {
        this.router.navigateByUrl('/weather');
    }

}
