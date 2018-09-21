import { Injectable, Output } from '@angular/core';
import { Todo } from './todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    todoList: Todo[];

    constructor() { }

    getTodoList(): Todo[] {
        const todos = localStorage.getItem('todos');

        if (todos) {
            this.todoList = this.parseTodos(todos);
            this.keepSorted();
        }

        return this.todoList;
    }

    saveTodo(text: string): void {
        if (text.length) {
            this.todoList.unshift(new Todo(text));
            this.saveTodosToLocalStorage();

            this.keepSorted();
        }
    }

    updateTodo(id: string, text: string) {
        if (text.length) {
            const todo = this.getTodo(id);

            todo.text = text;
            todo.lastEditDate = new Date();

            this.saveTodosToLocalStorage();

            this.keepSorted();
        }
    }

    deleteTodo(todo: Todo): void {
        this.todoList.splice(this.todoList.indexOf(todo), 1);
        this.saveTodosToLocalStorage();
    }

    getTodo(id: string) {
        return this.todoList.find(el => el.id === id);
    }

    toggleDone(todo: Todo) {
        todo.isDone = !todo.isDone;
        this.saveTodosToLocalStorage();
        this.keepSorted();
    }

    count(): number {
        if (!this.todoList) {
            return this.getTodoList().length;
        }

        return this.todoList.length;
    }

    private saveTodosToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    private parseTodos(todos: string) {
        const res = JSON.parse(todos);
        for (const todo of res) {
            todo.lastEditDate = new Date(todo.lastEditDate);
        }

        return res;
    }

    private keepSorted(): void {
        this.todoList = this.todoList.sort((a, b) => {
            return b.lastEditDate.getTime() - a.lastEditDate.getTime();
        }).sort((a, b) => {
            return +a.isDone - +b.isDone;
        });
    }
}
