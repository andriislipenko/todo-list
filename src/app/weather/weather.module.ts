import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { WeatherDatePipe } from './weather-date.pipe';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        AutoCompleteModule,
        FormsModule,
        ButtonModule
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
