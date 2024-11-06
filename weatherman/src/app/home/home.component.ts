import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, CurrentWeatherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
