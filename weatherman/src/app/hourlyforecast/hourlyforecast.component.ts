import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { LocationService } from '../services/location.service';
import { HourlyWeather } from '../models/weather-data';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-hourlyforecast',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './hourlyforecast.component.html',
})
export class HourlyforecastComponent implements OnInit, OnChanges {
  @Input() searchResult: any;

  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: HourlyWeather[] | undefined;
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
      this.fetchHourlyForecastByCity(changes['searchResult'].currentValue.location.name);
    }
  }

  async loadWeatherData() {
    if (this.searchResult) {
      this.fetchHourlyForecastByCity(this.searchResult.location.name);
    } else {
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.fetchHourlyForecastByGeoLocation(this.userPosition.latitude, this.userPosition.longitude);
      }
    }
  }

  fetchHourlyForecastByGeoLocation(latitude: number, longitude: number) {
    this.weather.getHourlyForecastWeatherData(latitude, longitude).subscribe(
      data => {
        this.useWeatherData(data);
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching forecast data:', error);
        this.isLoading = false;
      }
    );
  }

  fetchHourlyForecastByCity(city: string) {
    this.weather.getHourlyForecastWeatherDataByCity(city).subscribe(
      data => {
        this.useWeatherData(data);
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching forecast data for city:', error);
        this.isLoading = false;
      }
    );
  }

  useWeatherData(data: any) {
    const currentHour = new Date().getHours();
    if (data && data.forecast && data.forecast.forecastday && data.forecast.forecastday[0]) {
      this.weatherData = data.forecast.forecastday[0].hour.slice(currentHour, currentHour + 7).map((hour: HourlyWeather) => ({
        ...hour, hourFormat: this.calculator.formatHourToAmPm(hour.time)
      }));
    } else {
      console.error('Invalid data structure:', data);
      this.weatherData = [];
      this.isLoading = false;
    }
  }

  trackHour(index: number, hour: HourlyWeather): number {
    return index;
  }
}