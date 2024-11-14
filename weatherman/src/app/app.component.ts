import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherman';
 weatherCondition: any;

  ngOnInit(): void { this.updateBodyClass(); }

  updateBodyClass() {
    const body = document.body;
    body.className = '';
    switch (this.weatherCondition) {
      case 'sunny':
        body.classList.add('bg-sunny');
        break;
      case 'rainy':
        body.classList.add('bg-rainy');
        break;
      case 'cloudy':
        body.classList.add('bg-cloudy');
        break;
      default:
        body.classList.add('bg-default');
    }
  }

  onReceiveDataFromCurrent(data: any) {
    this.weatherCondition = data;
    this.updateBodyClass();
  }
}