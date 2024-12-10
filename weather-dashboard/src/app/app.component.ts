import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { AddCityComponent } from './components/add-city/add-city.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'weather-dashboard';
}
