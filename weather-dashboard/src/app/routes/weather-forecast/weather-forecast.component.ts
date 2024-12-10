import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  cityName: string = '';
  forecast: any[] = [];
  loading: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('city') || '';

    this.weatherService.getForecast(this.cityName).subscribe({
      next: (data) => {
        this.forecast = data.list.filter((item: any) => {
          const forecastDate = new Date(item.dt_txt);
          return forecastDate.getHours() === 9;
        });

        const groupedByDate = this.groupByDate(this.forecast);
        this.forecast = Object.keys(groupedByDate).map((date) => ({
          date,
          forecast: groupedByDate[date],
        }));

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  groupByDate(data: any[]) {
    return data.reduce((result: any, item: any) => {
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
