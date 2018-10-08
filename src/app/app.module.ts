import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { TodoModule } from './todo/todo.module';
import { WeatherModule } from './weather/weather.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        TodoModule,
        WeatherModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
