import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { TodoModule } from './todo/todo.module';
import { WeatherModule } from './weather/weather.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    TodoModule,
    WeatherModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
