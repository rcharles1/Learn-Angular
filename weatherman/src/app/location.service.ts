import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async getCoordinates(): Promise<{ latitude: number; longitude: number }> {
    try {
      const position = await this.getPosition();
      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }
}
