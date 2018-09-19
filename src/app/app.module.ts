import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { TodoModule } from './todo/todo.module';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: 'todo', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    TodoModule,
    ButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
