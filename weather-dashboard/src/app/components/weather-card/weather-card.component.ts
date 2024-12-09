import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() city!: { name: string; temp: number; condition: string };
  @Output() remove = new EventEmitter<string>();
}
