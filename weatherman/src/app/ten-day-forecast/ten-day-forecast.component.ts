import { Component, inject, OnInit } from '@angular/core';
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
  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: ForecastDay[] | undefined;
  location = inject(LocationService);
  weather = inject(WeatherDataService);
  calculator = inject(CalculatorService);
  forecastImageUrl: string;
 
  constructor() {
    this.forecastImageUrl = '';
  }

  async ngOnInit() {
    try {
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.weather.getTenDayForecastWeatherData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            this.weatherData = data?.forecast?.forecastday.map((day: ForecastDay) => ({ 
              ...day, dayFormat: this.calculator.formatDate(day.date) 
            }));;
          },
          error => {
            console.error('Error fetching forecast data:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error getting user position:', error);
    }
  }

  trackDay(index: number, day: ForecastDay): number { return index; }
}
