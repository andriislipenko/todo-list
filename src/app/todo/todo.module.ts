import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';

import {CheckboxModule} from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormateDatePipe } from './formate-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    ConfirmDialogModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TodoListComponent,
    FormateDatePipe
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoModule { }
