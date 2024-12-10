import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { AddCityComponent } from '../../components/add-city/add-city.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { ModalComponent } from '../../components/modal/modal.component';

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
  cities: any[] = [];
  showModal: boolean = false; 
  errorMessage: string = ''; 

  constructor(private weatherService: WeatherService) {
    this.loading$ = this.weatherService.loading$;
  }

  loading$: any;

  ngOnInit(): void {
    this.loadCitiesFromLocalStorage();
  }

  loadCitiesFromLocalStorage() {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      this.cities = JSON.parse(savedCities);
    }
  }

  addCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        const newCity = {
          name: data.name,
          temp: data.main.temp,
          condition: data.weather[0].main,
        };
        this.cities.push(newCity);
        localStorage.setItem('cities', JSON.stringify(this.cities));
      },
      error: () => {
        this.errorMessage = 'City not found'; 
        this.showModal = true;
      },
    });
  }

  removeCity(cityName: string) {
    this.cities = this.cities.filter((c) => c.name !== cityName);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  closeModal() {
    this.showModal = false; 
  }
}
