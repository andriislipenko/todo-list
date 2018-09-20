import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    providers: [ConfirmationService]
})
export class TodoListComponent implements OnInit {
    todoOnEditId: string;
    todoList: Todo[];
    constructor(
        private todoService: TodoService,
        private confService: ConfirmationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.todoList = this.todoService.getTodoList();
    }

    editTodo(id: string) {
        this.todoOnEditId = id;
    }

    updateTodo(text: string): void {
        this.todoService.updateTodo(this.todoOnEditId, text);
        this.cancelEditing();
    }

    deleteTodo(todo): void {
        this.confService.confirm({
            message: 'Are you shure to delete this ToDo item?',
            key: todo.id,
            accept: () => {
                this.todoService.deleteTodo(todo);
            }
        });
    }

    toggleDone(todo: Todo) {
        this.todoService.toggleDone(todo);
    }

    cancelEditing() {
        this.todoOnEditId = '';
    }
}
