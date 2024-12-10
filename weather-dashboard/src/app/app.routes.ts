import { Routes } from '@angular/router';
import { WeatherForecastComponent } from './routes/weather-forecast/weather-forecast.component';
import { MainPageComponent } from './routes/main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent }, 
  { path: 'forecast/:city', component: WeatherForecastComponent }
];
