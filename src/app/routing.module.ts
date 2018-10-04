import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
    { path: 'todo', component: TodoComponent },
    { path: 'weather', component: WeatherComponent },
    { path: '', redirectTo: 'todo', pathMatch: 'full' }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    declarations: []
})
export class RoutingModule { }
