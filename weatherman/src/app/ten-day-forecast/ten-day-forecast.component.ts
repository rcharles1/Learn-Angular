import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { LocationService } from '../services/location.service';
import { ForecastDay } from '../models/weather-data';

@Component({
  selector: 'app-ten-day-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ten-day-forecast.component.html',
  styleUrl: './ten-day-forecast.component.css'
})
export class TenDayForecastComponent {
  @Input() searchResult: any;

  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: ForecastDay[] | undefined;
  location = inject(LocationService);
  weather = inject(WeatherDataService);
  calculator = inject(CalculatorService);
  isLoading = true;
 
  constructor() {}

  async ngOnInit() {
    try {
      await this.loadWeatherData();
    } catch (error) {
      console.error('Error getting user position:', error);
      this.isLoading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult'] && changes['searchResult'].currentValue) {
      this.fetchForecastByCity(changes['searchResult'].currentValue.location.name);
    }
  }

  async loadWeatherData() {
    if (this.searchResult) {
      this.fetchForecastByCity(this.searchResult.location.name);
    } else {
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.fetchForecastByGeoLocation(this.userPosition.latitude, this.userPosition.longitude);
      }
    }
  }

  fetchForecastByGeoLocation(latitude: number, longitude: number) {
    this.weather.getTenDayForecastWeatherData(latitude, longitude).subscribe(
      data => {
        this.useWeatherData(data);
      },
      error => {
        console.error('Error fetching forecast data by geo-location:', error);
      }
    );
  }

  fetchForecastByCity(city: string) {
    this.weather.getTenDayForecastWeatherDataByCity(city).subscribe(
      data => {
        this.useWeatherData(data);
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching forecast data by city:', error);
        this.isLoading = false;
      }
    );
  }

  useWeatherData(data: any) {
    if (data && data.forecast && data.forecast.forecastday && data.forecast.forecastday[0]) {
      this.weatherData = data?.forecast?.forecastday.map((day: ForecastDay) => ({ 
        ...day, dayFormat: this.calculator.formatDate(day.date) 
      }));;
    } else {
      console.error('Invalid data structure:', data);
      this.weatherData = [];
    }
  }

  trackDay(index: number, day: ForecastDay): number { return index; }
}