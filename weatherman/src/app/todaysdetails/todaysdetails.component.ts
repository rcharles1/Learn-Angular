import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../services/location.service';
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { HalfCircleProgressBarComponent } from '../half-circle-progress-bar/half-circle-progress-bar.component';
import { Astro } from '../models/weather-data';

@Component({
  selector: 'app-todaysdetails',
  standalone: true,
  imports: [CommonModule, HalfCircleProgressBarComponent],
  templateUrl: './todaysdetails.component.html',
  styleUrl: './todaysdetails.component.css'
})
export class TodaysdetailsComponent {
  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: any;
  astroData: Astro | undefined;
  hoursBetweenSunriseAndSunset: { hours: number, minutes: number} | undefined; 
  hoursBetweenMoonriseAndMoonset: { hours: number, minutes: number} | undefined;
  location = inject(LocationService);
  weather = inject(WeatherDataService);
  calculator = inject(CalculatorService);
         
  constructor() {
  }

  async ngOnInit() {
    try {
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.weather.getCurrentWeatherData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            this.weatherData = data;
          },
          error => {
            console.error('Error fetching todays details:', error);
          }
        );
        this.weather.getTAstroData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            this.astroData = data?.forecast?.forecastday?.[0].astro;
            if (this.astroData) { 
              if (this.calculator.isValidTimeString(this.astroData.sunrise) && this.calculator.isValidTimeString(this.astroData.sunset)) { 
                this.hoursBetweenSunriseAndSunset = this.calculator.calculateTimeDifference(this.astroData.sunrise, this.astroData.sunset); }
              
              if (this.calculator.isValidTimeString(this.astroData.moonrise) && this.calculator.isValidTimeString(this.astroData.moonset)) { 
                this.hoursBetweenMoonriseAndMoonset = this.calculator.calculateTimeDifference(this.astroData.moonrise, this.astroData.moonset); 
              } 
            }
          },
          error => {
            console.error('Error fetching astro data:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error getting user position:', error);
    }
  }
  
}
