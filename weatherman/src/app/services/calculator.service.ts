import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  /** * A function that formats the time from YYYY-MM-DD HH:MM to an object with 
   * hours and minutes. * @param {string} apiTime - The time string from the API in the format YYYY-MM-DDTHH:MM:SSZ. *
   *  @returns {Object} An object containing hours and minutes. 
   */
  formatTime(apiTime: string) {
    const dateObj = new Date(apiTime);

    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return ({
      hours: hours,
      minutes: minutes,
    });
  }
}
