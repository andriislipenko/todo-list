import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TodoService } from '../todo/todo.service';
import { WeatherService } from '../weather/weather.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    public readonly TODO_TITLE = 'Tasks';
    public readonly WEATHER_TITLE = 'Weather';

    public items: MenuItem[];

    constructor(
        private todoService: TodoService,
        private weatherService: WeatherService
    ) {}

    ngOnInit(): void {
        this.getTodosAmount();
        this.getCurrentTemperature();

        this.items = [
            {label: this.TODO_TITLE, routerLink: '/todo'},
            {label: this.WEATHER_TITLE, routerLink: '/weather'}
        ];
    }

    private getTodosAmount(): void {
        this.todoService.todosAmount
        .pipe(delay(100))
        .subscribe((amount: number) => {
            this.items.find((item: MenuItem) => {
                return item.label.includes(this.TODO_TITLE);
            }).label = `${this.TODO_TITLE}: ${amount}`;
        });
    }

    private getCurrentTemperature(): void {
        this.weatherService.getCurrentTemperature().subscribe((temperature: number) => {
            this.items.find((item: MenuItem) => {
                return item.label.includes(this.WEATHER_TITLE);
            }).label = `${this.WEATHER_TITLE}: ${temperature}\u2103`;
        });
    }
}
