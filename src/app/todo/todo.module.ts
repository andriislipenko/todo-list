import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';

import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule
  ],
  declarations: [
    TodoListComponent
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoModule { }
