import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../services/location.service';
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './current-weather.component.html',
  //styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: any;
  location = inject(LocationService);
  weather = inject(WeatherDataService);
  calculator = inject(CalculatorService);
  currentWeatherImageUrl: string;
  lastUpdateTime: string;
         
  constructor() {
    this.currentWeatherImageUrl = '';
    this.lastUpdateTime = '';
  }

  async ngOnInit() {
    try {
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.weather.getCurrentWeatherData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            this.weatherData = data;
            this.currentWeatherImageUrl = `/custom_icons/${this.weatherData?.current?.is_day ? 'day' : 'night'}/icon_${this.weatherData?.current?.condition?.code}.svg`;
            const formattedTime =  this.calculator.formatTime(this.weatherData?.current?.last_updated);
            this.lastUpdateTime = `${formattedTime.hours}:${formattedTime.minutes}`;
          },
          error => {
            console.error('Error fetching weather data:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error getting user position:', error);
    }
  }
}