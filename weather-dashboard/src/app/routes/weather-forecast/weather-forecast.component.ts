import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.sass',
})
export class WeatherForecastComponent implements OnInit {
  cityName: string = '';
  forecast: any[] = [];
  loading: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Отримуємо ім'я міста з параметрів маршруту
    this.cityName = this.route.snapshot.paramMap.get('city') || '';

    // Отримуємо прогноз на кілька днів для вибраного міста
    this.weatherService.getForecast(this.cityName).subscribe({
      next: (data) => {
        this.forecast = data.list; // Зберігаємо прогноз
        this.loading = false; // Оновлюємо стан завантаження
      },
      error: () => {
        this.loading = false;
        alert('Не вдалося отримати прогноз для цього міста');
      },
    });
  }
}
