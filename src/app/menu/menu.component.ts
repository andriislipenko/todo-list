import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TodoService } from '../todo/todo.service';
import { WeatherService } from '../weather/weather.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
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
        this.items = [
            { label: this.TODO_TITLE, routerLink: '/todo' },
            { label: this.WEATHER_TITLE, routerLink: '/weather' }
        ];

        this.getTodosAmount();
        this.getCurrentTemperature();
    }

    private getTodosAmount(): void {
        this.todoService.todosAmount.subscribe((amount: number) => {
            this.items.find((item: MenuItem) => {
                return item.label.includes(this.TODO_TITLE);
            }).label = `${this.TODO_TITLE}: ${amount}`;
        });
    }

    private getCurrentTemperature(): void {
        this.weatherService
            .getCurrentTemperature()
            .subscribe((temperature: number) => {
                this.items.find((item: MenuItem) => {
                    return item.label.includes(this.WEATHER_TITLE);
                }).label = `${this.WEATHER_TITLE}: ${Math.round(
                    temperature
                )}\u2103`;
            });
    }
}
