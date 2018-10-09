import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../entities/todo';
import { TodoService } from '../../todo.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    providers: [ConfirmationService]
})
export class TodoItemComponent {
    @Input() todo: Todo = null;
    @Input() todoOnEditId: string = null;

    @Output() edit = new EventEmitter();

    public isHover = false;

    constructor(
        private todoService: TodoService,
        private confirmService: ConfirmationService
    ) {}

    public editTodo(id: string): void {
        this.edit.emit(id);
        this.isHover = false;
    }

    public updateTodo(text: string): void {
        this.todoService.updateTodo(this.todoOnEditId, text);
        this.finishEditing();
    }

    public deleteTodo(todo: Todo): void {
        this.confirmService.confirm({
            message: 'Are you shure to delete this ToDo item?',
            key: todo.id,
            accept: () => {
                this.todoService.deleteTodo(todo);
            }
        });
    }

    public toggleDone(todo: Todo): void {
        this.todoService.toggleDone(todo);
    }

    public finishEditing(): void {
        this.edit.emit('');
    }
}
