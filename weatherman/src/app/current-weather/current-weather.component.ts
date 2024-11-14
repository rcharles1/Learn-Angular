import { Component, inject, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../services/location.service';
import { WeatherDataService } from '../services/weather-data.service';
import { CalculatorService } from '../services/calculator.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SkeletonComponent], 
  templateUrl: './current-weather.component.html',
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Output() weatherDataUsed = new EventEmitter<any>();
  @Input() searchResult: any;
  isLoading = true;

  userPosition: { latitude: number; longitude: number } | undefined;
  weatherData: any;
  degreeSymbol = '\u00B0';
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
      this.loadWeatherData();
    } catch (error) {
      console.error('Error getting user position:', error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult'] && !changes['searchResult'].firstChange) {
      if (this.searchResult) {
        this.useWeatherData(this.searchResult);
      }
    }
  }

  async loadWeatherData() {
    if (this.searchResult) {
      // Use search result if available
      this.useWeatherData(this.searchResult);
    } else {
      // Proceed with using latitude and longitude
      this.userPosition = await this.location.getCoordinates();
      if (this.userPosition) {
        this.weather.getCurrentWeatherData(this.userPosition.latitude, this.userPosition.longitude).subscribe(
          data => {
            this.useWeatherData(data);
          },
          error => {
            console.error('Error fetching weather data:', error);
          }
        );
      }
    }
  }

  useWeatherData(data: any) {
    this.isLoading = false;
    this.weatherData = data;
    
    this.weatherDataUsed.emit(this.weatherData);

    this.currentWeatherImageUrl = `/custom_icons/${this.weatherData?.current?.is_day ? 'day' : 'night'}/icon_${this.weatherData?.current?.condition?.code}.svg`;
    const formattedTime = this.calculator.formatTime(this.weatherData?.current?.last_updated);
    this.lastUpdateTime = `${formattedTime.hours}:${formattedTime.minutes}`;
  }
}