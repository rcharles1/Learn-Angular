import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { HourlyforecastComponent } from "../hourlyforecast/hourlyforecast.component";
import { TenDayForecastComponent } from '../ten-day-forecast/ten-day-forecast.component';
import { TodaysdetailsComponent } from '../todaysdetails/todaysdetails.component';
import { SearchComponent } from "../search/search.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrentWeatherComponent, HourlyforecastComponent, TenDayForecastComponent, TodaysdetailsComponent, SearchComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  searchResult: any;

  handleWeatherDataFound(data: any) {
    this.searchResult = data;
  }
}
