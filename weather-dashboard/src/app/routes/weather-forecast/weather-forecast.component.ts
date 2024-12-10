import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { main: string; description?: string }[];
}

interface GroupedForecast {
  date: string;
  forecast: ForecastItem[];
}

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  cityName: string = '';
  forecast: GroupedForecast[] = [];
  loading: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('city') || '';

    if (!this.cityName.trim()) {
      this.goBack();
      return;
    }

    this.weatherService.getForecast(this.cityName).subscribe({
      next: (data) => {
        const filtered = this.filterForecast(data.list);
        const groupedByDate = this.groupByDate(filtered);
        this.forecast = Object.keys(groupedByDate).map((date) => ({
          date,
          forecast: groupedByDate[date],
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching forecast:', err);
        this.loading = false;
      },
    });
  }

  private filterForecast(data: ForecastItem[]): ForecastItem[] {
    return data.filter((item) => new Date(item.dt_txt).getHours() === 9);
  }

  private groupByDate(data: ForecastItem[]): Record<string, ForecastItem[]> {
    return data.reduce((result: Record<string, ForecastItem[]>, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(item);
      return result;
    }, {});
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
