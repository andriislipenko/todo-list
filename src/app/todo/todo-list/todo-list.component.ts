import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
    public todoOnEditId: string = null;
    private _todoList: Todo[] = null;

    constructor(
        private todoService: TodoService
    ) {}

    ngOnInit(): void {
        this.todoList = this.todoService.getTodoList();
    }

    public setTodoOnEditId(id: string): void {
        this.todoOnEditId = id;
    }

    set todoList(todoList: Todo[]) {
        this._todoList = todoList;
    }

    get todoList(): Todo[] {
        return this.todoService.keepSorted(this._todoList);
    }
}
