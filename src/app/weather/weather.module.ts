import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { WeatherDatePipe } from './weather-date.pipe';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
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
