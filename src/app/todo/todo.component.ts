import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    constructor(
        private todoService: TodoService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Todo');
    }

    saveTodo(text: string): void {
        this.todoService.saveTodo(text);
    }
}
