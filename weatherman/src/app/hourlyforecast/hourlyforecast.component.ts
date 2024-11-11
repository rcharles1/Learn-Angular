import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { LocationService } from '../services/location.service';
import { HourlyWeather } from '../models/weather-data';

@Component({
  selector: 'app-hourlyforecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourlyforecast.component.html',
})
export class HourlyforecastComponent implements OnInit, OnChanges {
  @Input() searchResult: any;

  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: HourlyWeather[] | undefined;
  isLoading = true; // Initialize loading flag
  location = inject(LocationService);
  weather = inject(WeatherDataService);
  calculator = inject(CalculatorService);
  forecastImageUrl: string;
         
  constructor() {
    this.forecastImageUrl = '';
  }

  async ngOnInit() {
    try {
      await this.loadWeatherData();
    } catch (error) {
      console.error('Error getting user position:', error);
      this.isLoading = false; // Set loading to false on error
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']) {
      if (this.searchResult) {
        this.useWeatherData(this.searchResult);
      }
    }
  }

  async loadWeatherData() {
    if (this.searchResult) {
      // Use search result if available
      this.fetchHourlyForecastByCity(this.searchResult.location.region);
    } else {
      // Proceed with using latitude and longitude
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.fetchHourlyForecastByGeoLocation(this.userPosition.latitude, this.userPosition.longitude);
      }
    }
  }

  // Uses Geo-Location
  fetchHourlyForecastByGeoLocation(latitude: number, longitude: number) {
    this.weather.getHourlyForecastWeatherData(latitude, longitude).subscribe(
      data => {
        this.useWeatherData(data);
        this.isLoading = false; // Set loading to false after data is fetched
      },
      error => {
        console.error('Error fetching forecast data:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }

  // Uses searched city
  fetchHourlyForecastByCity(city: string) {
    this.weather.getHourlyForecastWeatherDataByCity(city).subscribe(
      data => {
        this.useWeatherData(data);
        this.isLoading = false; // Set loading to false after data is fetched
      },
      error => {
        console.error('Error fetching forecast data for city:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }

  useWeatherData(data: any) {
    const currentHour = new Date().getHours();
    this.weatherData = data?.forecast?.forecastday?.[0].hour.slice(currentHour, currentHour + 7).map((hour: HourlyWeather) => ({
      ...hour, hourFormat: this.calculator.formatHourToAmPm(hour.time)
    }));
  }

  trackHour(index: number, hour: HourlyWeather): number { 
    return index; 
  }
}
