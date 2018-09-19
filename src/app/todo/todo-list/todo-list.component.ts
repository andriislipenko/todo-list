import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [ConfirmationService]
})
export class TodoListComponent implements OnInit {
  todoList: Todo[];
  constructor(
    private todoService: TodoService,
    private confService: ConfirmationService
  ) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodoList();
  }

  toggleDone(todo: Todo): void {
    todo.isDone = !todo.isDone;
  }

  deleteTodo(todo): void {
    this.confService.confirm({
      message: 'Are you shure to delete this ToDo item?',
      key: `${todo.id}`,
      accept: () => {
        this.todoService.deleteTodo(todo);
      }
    });
  }
}
