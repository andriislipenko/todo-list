import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo/todo.service';
import { WeatherService } from './weather/weather.service';
import { Weather } from './weather/weather';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public todoLabel = 'Tasks: ';
    public weatherLabel = 'Weather: ';

    public todosAmount: number = null;
    public currentTemperature: number = 5;

    constructor(
        private router: Router,
        private todoService: TodoService,
        private weatherService: WeatherService
    ) {
        this.todoService = todoService;
        this.weatherService = weatherService;
    }

    ngOnInit(): void {
        this.getTodosAmount();
        // this.getCurrentTemperature();
    }

    public toTodo(): void {
        this.router.navigateByUrl('/todo');
    }

    public toWeather(): void {
        this.router.navigateByUrl('/weather');
    }

    private getTodosAmount(): void {
        this.todoService.todosAmount
        .pipe(delay(100))
        .subscribe((amount: number) => {
            this.todosAmount = amount;
        });
    }

    // private getCurrentTemperature(): void {
    //     this.weatherService.getCurrentTemperature();
    // }
}
