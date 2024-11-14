import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  @Output() weatherDataFound = new EventEmitter<any>();

  searchedWeatherData: any;
  weather = inject(WeatherDataService);
  city: string | undefined;
         
  searchForm = new FormGroup({
    city: new FormControl(''),
  });

  constructor() {
  }

  ngOnInit(): void {}

  handleSubmit() {
    this.city = this.searchForm.get('city')?.value || '';
    this.fetchData();
  }

  async fetchData() {
    try {
      if (this.city) {
        this.weather.searchCurrentWeatherData(this.city).subscribe(
          data => {
            this.searchedWeatherData = data;
            this.weatherDataFound.emit(this.searchedWeatherData);
          },
          error => {
            console.error('Error fetching searched weather data:', error);
          }
        );
      }
    } catch (error) {
      console.error('Invalid input:', error);
    }
  }
}
