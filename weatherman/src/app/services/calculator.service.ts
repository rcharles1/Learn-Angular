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

  /** * A function that formats the time from YYYY-MM-DDTHH:MM:SSZ to AM/PM hour format. * @param {string} apiTime - The time string from the API in the format YYYY-MM-DDTHH:MM:SSZ. * @returns {string} The formatted hour in AM/PM format. */ 
  formatHourToAmPm(apiTime: string): string { 
    const date = new Date(apiTime); 
    const hours = date.getHours(); 
    const ampm = hours >= 12 ? 'PM' : 'AM'; 
    const formattedHours = hours % 12 || 12;
    return `${formattedHours} ${ampm}`; 
  }

  formatDate(apiDate: string) { 
    const dateObj = new Date(apiDate); 
    const dayOfWeekNum = dateObj.getDay(); 
    
    let day = dateObj.getDate(); 
    let month = dateObj.getMonth(); 
    let year = dateObj.getFullYear(); 
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
    const daysOfWeekName = days[dayOfWeekNum]; 
    const monthName = months[month]; 
    
    day = day < 10 ? 0 + day : day; 
    month = month < 10 ? 0 + month : month; 
    
    return {
       weekDay: daysOfWeekName, 
       day: day, 
       month: monthName, 
       year: year, 
    };
  }

  calculateTimeDifference(startTime: string, endTime: string): number { 
    // Helper function to convert time in 'HH:MM AM/PM' format to Date object 
    const convertToTime = (time: string): Date => { 
      const [hourMinute, modifier] = time.split(' '); 
      let [hours, minutes] = hourMinute.split(':').map(Number); 
      if (modifier === 'PM' && hours !== 12) { 
        hours += 12; 
      } else if (modifier === 'AM' && hours === 12) { 
        hours = 0; 
      } return new Date(1970, 0, 1, hours, minutes); 
    }; // Parse the start and end times as Date objects 

    const start = convertToTime(startTime); 
    const end = convertToTime(endTime); // Calculate the difference in milliseconds 
    const differenceInMs = end.getTime() - start.getTime(); // Convert the difference from milliseconds to hours 
    const differenceInHours = differenceInMs / (1000 * 60 * 60); 

  return differenceInHours; }

  isValidTimeString(time: string | undefined): time is string { return typeof time === 'string' && !!time; }
}
