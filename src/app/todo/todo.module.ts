import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';

import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoItemComponent
  ]
})
export class TodoModule { }
