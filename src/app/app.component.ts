import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo/todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ToDo + Weather';
    todoLabel: string;
    constructor(
        private router: Router,
        private todoService: TodoService
    ) {
        this.todoLabel = `To Do: `;
    }
    toTodo(): void {
        this.router.navigateByUrl('/todo');
    }
    toWeather(): void {
        this.router.navigateByUrl('/weather');
    }
}
