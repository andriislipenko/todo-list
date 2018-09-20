import { Injectable } from '@angular/core';
import { Todo } from './todo';

const testTodo: Todo = new Todo('testChecked');
testTodo.isDone = true;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: Todo[] = [
    new Todo('test1'),
    testTodo
  ];

  constructor() { }

  getTodoList(): Todo[] {
    return this.todoList;
  }

  saveTodo(text: string): void {
    this.todoList.unshift(new Todo(text));

    this.keepSorted();
  }

  updateTodo(id: string, text: string) {
    const todo = this.getTodo(id);

    todo.text = text;
    todo.lastEditDate = new Date();

    this.keepSorted();
  }

  deleteTodo(todo: Todo): void {
    this.todoList.splice(this.todoList.indexOf(todo), 1);
  }

  private keepSorted(): void {
    this.todoList = this.todoList.sort((a, b) => {
      return b.lastEditDate.getTime() - a.lastEditDate.getTime();
    });
  }

  getTodo(id: string) {
    return this.todoList.find( el => el.id === id );
  }
}
