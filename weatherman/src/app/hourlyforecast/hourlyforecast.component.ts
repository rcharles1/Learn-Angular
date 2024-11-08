import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { LocationService } from '../services/location.service';
import { HourlyWeather, WeatherData } from '../models/weather-data';

@Component({
  selector: 'app-hourlyforecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourlyforecast.component.html',
})
export class HourlyforecastComponent {
  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: HourlyWeather[] | undefined;
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
        this.weather.getHourlyForecastWeatherData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            const currentHour = new Date().getHours();
            this.weatherData = data?.forecast?.forecastday?.[0].hour.slice(currentHour, currentHour + 7).map((hour: HourlyWeather) => ({ 
              ...hour, hourFormat: this.calculator.formatHourToAmPm(hour.time) 
            }));
            console.log(this.weatherData)
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

  trackHour(index: number, hour: HourlyWeather): number { return index; }
}
