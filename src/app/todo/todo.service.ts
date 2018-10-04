import { Injectable, Output } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    public todoList: Todo[] = null;
    public todosAmount = new Subject<number>();

    public getTodoList(): Todo[] {
        const todos = localStorage.getItem('todos');

        if (todos) {
            this.todoList = this.parseTodos(todos);
        } else {
            this.todoList = [];
        }

        this.updateCounter();

        return this.todoList;
    }

    public saveTodo(text: string): void {
        if (text.length) {
            this.todoList.unshift(new Todo(text));
            this.saveTodosToLocalStorage();
            this.updateCounter();
        }
    }

    public getTodo(id: string): Todo {
        return this.todoList.find(el => el.id === id);
    }

    public updateTodo(id: string, text: string): void {
        if (text.length) {
            const todo = this.getTodo(id);

            todo.text = text;
            todo.lastEditDate = new Date();

            this.saveTodosToLocalStorage();
        }
    }

    public deleteTodo(todo: Todo): void {
        this.todoList.splice(this.todoList.indexOf(todo), 1);
        this.saveTodosToLocalStorage();
        this.updateCounter();
    }

    public keepSorted(todoList: Todo[]): Todo[] {
        if (!todoList) {
            return [];
        }

        return todoList.sort((a, b) => {
            return b.lastEditDate.getTime() - a.lastEditDate.getTime();
        }).sort((a, b) => {
            return +a.isDone - +b.isDone;
        });
    }

    public getTodosAmount(): Observable<number> {
        if (!this.todoList) {
            this.getTodoList();
        }
        return this.todosAmount.asObservable();
    }

    public toggleDone(todo: Todo) {
        todo.isDone = !todo.isDone;
        this.saveTodosToLocalStorage();
    }

    private updateCounter(): void {
        this.todosAmount.next(this.todoList.length);
    }

    private saveTodosToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    private parseTodos(todos: string): Todo[] {
        const res = JSON.parse(todos);
        for (const todo of res) {
            todo.lastEditDate = new Date(todo.lastEditDate);
        }

        return res;
    }
}
