import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { AddCityComponent } from '../../components/add-city/add-city.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';

@Component({
  selector: 'app-main-page',
  imports: [AddCityComponent, WeatherCardComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass',
})
export class MainPageComponent implements OnInit {
  cities: any[] = [];

  constructor(private weatherService: WeatherService) {
    this.loading$ = this.weatherService.loading$;
  }

  loading$: any;

  ngOnInit(): void {
    this.loadCitiesFromLocalStorage(); // Завантажити міста з localStorage при ініціалізації
  }

  // Завантаження списку міст з localStorage
  loadCitiesFromLocalStorage() {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      this.cities = JSON.parse(savedCities); // Преобразування в масив об'єктів
    }
  }

  // Додавання міста в список та збереження в localStorage
  addCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        const newCity = {
          name: data.name,
          temp: data.main.temp,
          condition: data.weather[0].main,
        };
        this.cities.push(newCity);
        localStorage.setItem('cities', JSON.stringify(this.cities)); // Збереження в localStorage
      },
      error: () => alert('City not found'),
    });
  }

  // Видалення міста зі списку та збереження змін у localStorage
  removeCity(cityName: string) {
    this.cities = this.cities.filter((c) => c.name !== cityName);
    localStorage.setItem('cities', JSON.stringify(this.cities)); // Збереження в localStorage
  }
}
