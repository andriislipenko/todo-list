import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
    constructor(private todoService: TodoService) { }

    saveTodo(text: string): void {
        this.todoService.saveTodo(text);
    }
}
