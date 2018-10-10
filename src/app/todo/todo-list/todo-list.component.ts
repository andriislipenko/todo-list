import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../entities/todo';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: [ConfirmationService]
})
export class TodoListComponent implements OnInit {
    public todoOnEditId: string = null;
    public isCollapsed = false;

    private _todoList: Todo[] = null;

    constructor(
        private todoService: TodoService,
        private confirmService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.todoList = this.todoService.getTodoList();
    }

    public deleteDone(): void {
        this.confirmService.confirm({
            message: 'Are you shure to delete all done ToDos?',
            accept: () => {
                this.todoService.deleteDone();
                this.todoList = this.todoService.getTodoList();
            }
        });
    }

    public setTodoOnEditId(id: string): void {
        this.todoOnEditId = id;
    }

    public toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    set todoList(todoList: Todo[]) {
        this._todoList = todoList;
    }

    get todoList(): Todo[] {
        return this.todoService.keepSorted(this._todoList);
    }
}
