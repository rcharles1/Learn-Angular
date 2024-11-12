import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LocationService } from '../services/location.service';
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { Astro } from '../models/weather-data';

@Component({
  selector: 'app-todaysdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todaysdetails.component.html',
  styleUrl: './todaysdetails.component.css'
})
export class TodaysdetailsComponent implements OnChanges {
  @Input() searchResult: any;

  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: any;
  astroData: Astro | undefined;
  hoursBetweenSunriseAndSunset: { hours: number, minutes: number} | undefined; 
  hoursBetweenMoonriseAndMoonset: { hours: number, minutes: number} | undefined;
  location = inject(LocationService);
  weather = inject(WeatherDataService);
  calculator = inject(CalculatorService);
         
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']) {
      if (this.searchResult) {
        this.useWeatherData(this.searchResult);
      }
    }
  }

  async ngOnInit() {
    try {
      this.loadWeatherData();
    } catch (error) {
      console.error('Error getting user position:', error);
    }
  }

  async loadWeatherData() {
    if(this.searchResult) {
      // Use search result if available
      this.useWeatherData(this.searchResult);
      this.fetchAstroData(this.searchResult.location.lat, this.searchResult.location.lon);
    } else {
      try {
        this.userPosition = await this.location.getCoordinates();
        if (this.userPosition) {
          await this.fetchWeatherData(this.userPosition.latitude, this.userPosition.longitude);
          await this.fetchAstroData(this.userPosition.latitude, this.userPosition.longitude);
        }
      } catch (error) {
        console.error('Error getting user position:', error);
      }
    }
  }
  
  async fetchWeatherData(latitude: number, longitude: number) {
    this.weather.getCurrentWeatherData(latitude, longitude).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error('Error fetching todays details:', error);
      }
    );
  }

  async fetchAstroData(latitude: number, longitude: number) {
    this.weather.getTAstroData(latitude, longitude).subscribe(
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

  useWeatherData(data: any) {
    console.log(data)
    this.weatherData = data;
  }
  
}
