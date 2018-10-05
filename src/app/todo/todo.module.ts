import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';

import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    TodoListComponent,
    TodoComponent,
    TodoItemComponent
  ],
  exports: [
    TodoListComponent,
    TodoComponent
  ]
})
export class TodoModule { }
