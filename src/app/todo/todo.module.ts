import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';

import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    ConfirmDialogModule
  ],
  declarations: [
    TodoListComponent
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoModule { }
