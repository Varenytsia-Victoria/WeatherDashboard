import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCityComponent } from '../../components/add-city/add-city.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { WeatherService } from '../../services/weather.service';

interface City {
  name: string;
  temp: number;
  condition: string;
}

@Component({
  selector: 'app-main-page',
  imports: [
    AddCityComponent,
    WeatherCardComponent,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  cities: City[] = [];
  showModal: boolean = false;
  errorMessage: string = '';
  loading$;

  constructor(private weatherService: WeatherService) {
    this.loading$ = this.weatherService.loading$;
  }

  ngOnInit(): void {
    this.loadCitiesFromLocalStorage();
  }

  private loadCitiesFromLocalStorage(): void {
    try {
      const savedCities = localStorage.getItem('cities');
      if (savedCities) {
        this.cities = JSON.parse(savedCities);
      }
    } catch (e) {
      console.error('Error loading cities from localStorage', e);
    }
  }

  addCity(city: string): void {
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        const newCity: City = {
          name: data.name,
          temp: data.main.temp,
          condition: data.weather[0].main,
        };
        this.cities.push(newCity);
        this.saveCitiesToLocalStorage();
      },
      error: () => {
        this.errorMessage = 'City not found';
        this.showModal = true;
      },
    });
  }

  removeCity(cityName: string): void {
    this.cities = this.cities.filter((c) => c.name !== cityName);
    this.saveCitiesToLocalStorage();
  }

  private saveCitiesToLocalStorage(): void {
    try {
      localStorage.setItem('cities', JSON.stringify(this.cities));
    } catch (e) {
      console.error('Error saving cities to localStorage', e);
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
