import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { AddCityComponent } from './components/add-city/add-city.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AddCityComponent, WeatherCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cities: any[] = [];
  loading = false;

  constructor(private weatherService: WeatherService) {}

  addCity(cityName: string) {
    this.loading = true;
    this.weatherService.getWeather(cityName).subscribe(
      (data) => {
        this.cities.push({
          name: data.name,
          temp: data.main.temp,
          condition: data.weather[0].main,
        });
        this.loading = false;
      },
      (error) => {
        alert('Місто не знайдено');
        this.loading = false;
      }
    );
  }

  removeCity(cityName: string) {
    this.cities = this.cities.filter((c) => c.name !== cityName);
  }
}
