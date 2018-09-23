import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { WeatherDatePipe } from './weather-date.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        WeatherComponent,
        WeatherDatePipe
    ],
    exports: [
        WeatherComponent
    ]
})
export class WeatherModule { }
