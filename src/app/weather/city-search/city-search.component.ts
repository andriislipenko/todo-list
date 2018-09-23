import { Component, OnInit } from '@angular/core';
import { City } from '../city';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  cities$: Observable<City[]>;
  private searchTerms = new Subject<string>();
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.cities$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.weatherService.searchCity(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
