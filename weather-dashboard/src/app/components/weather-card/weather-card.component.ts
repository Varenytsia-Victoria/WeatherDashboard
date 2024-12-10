import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() city!: { name: string; temp: number; condition: string };
  @Output() remove = new EventEmitter<string>();

  constructor(private router: Router) {}

  viewForecast(cityName: string) {
    this.router.navigate(['/forecast', cityName]);
  }
}
