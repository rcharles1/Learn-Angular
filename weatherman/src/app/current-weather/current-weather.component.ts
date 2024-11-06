import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { LocationService } from '../location.service';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Add CommonModule and HttpClientModule here
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: any;
  location = inject(LocationService);
  weather = inject(WeatherDataService);

  constructor() {}

  async ngOnInit() {
    try {
      this.userPosition = await this.location.getCoordinates();
      console.log('User Position:', this.userPosition);
      
      if (this.userPosition) {
        this.weather.getCurrentWeatherData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            this.weatherData = data;
            console.log('Weather Data:', this.weatherData);
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
