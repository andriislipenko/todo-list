import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { FiveDaysWeatherComponent } from './five-days-weather/five-days-weather.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        AutoCompleteModule,
        FormsModule
    ],
    declarations: [
        WeatherComponent,
        CurrentWeatherComponent,
        FiveDaysWeatherComponent
    ]
})
export class WeatherModule { }
