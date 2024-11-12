import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  apiUrl = `https://api.weatherapi.com/v1/`;
  apiKey = '09cfb71519ba4e91b5b134843241002';

  constructor(private http: HttpClient) { }

  // This function to fetches current weather data of a given city 
  searchCurrentWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`; 
    return this.http.get(url);
  }

  // This function to fetches current weather data
  getCurrentWeatherData(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${latitude},${longitude}`; 
    return this.http.get(url);
  }

  // This function to fetches hourly weather forecast by city
  getHourlyForecastWeatherDataByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&hours=7`; 
    return this.http.get(url);
  }

  // This function to fetches hourly weather forecast
  getHourlyForecastWeatherData(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${latitude},${longitude}&hours=7`; 
    return this.http.get(url);
  }

   // This function to fetches 10 Days weather forecast by city
   getTenDayForecastWeatherDataByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=7`; 
    return this.http.get(url);
  }

   // This function to fetches 10 Days weather forecast
   getTenDayForecastWeatherData(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${latitude},${longitude}&days=10`; 
    return this.http.get(url);
  }

   // This function to fetches 10 Days weather forecast
   getTAstroData(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${latitude},${longitude}&days=`; 
    return this.http.get(url);
  }
}
