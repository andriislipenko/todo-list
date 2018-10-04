import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../todo';
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

    constructor(
        private todoService: TodoService,
        private confirmService: ConfirmationService
    ) {}

    editTodo(id: string): void {
        this.edit.emit(id);
    }

    updateTodo(text: string): void {
        this.todoService.updateTodo(this.todoOnEditId, text);
        this.finishEditing();
    }

    deleteTodo(todo: Todo): void {
        this.confirmService.confirm({
            message: 'Are you shure to delete this ToDo item?',
            key: todo.id,
            accept: () => {
                this.todoService.deleteTodo(todo);
            }
        });
    }

    toggleDone(todo: Todo): void {
        this.todoService.toggleDone(todo);
    }

    finishEditing(): void {
        this.edit.emit('');
    }
}
