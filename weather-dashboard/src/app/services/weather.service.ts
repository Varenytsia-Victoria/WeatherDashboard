import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { main: string }[];
}

interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string }[];
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;
  private apiKey = environment.weatherApiKey;

  private loadingSubject = new Subject<boolean>();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherResponse> {
    if (!city.trim()) {
      return throwError(() => new Error('City name cannot be empty'));
    }

    this.setLoading(true);
    const url = this.buildUrl('weather', city);

    return this.http.get<WeatherResponse>(url).pipe(
      catchError(this.handleError),
      finalize(() => this.setLoading(false))
    );
  }

  getForecast(city: string): Observable<ForecastResponse> {
    if (!city.trim()) {
      return throwError(() => new Error('City name cannot be empty'));
    }

    this.setLoading(true);
    const url = this.buildUrl('forecast', city);

    return this.http.get<ForecastResponse>(url).pipe(
      catchError(this.handleError),
      finalize(() => this.setLoading(false))
    );
  }

  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  private buildUrl(endpoint: string, city: string): string {
    return `${this.apiUrl}/${endpoint}?q=${city}&appid=${this.apiKey}&units=metric`;
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Not found'));
  }
}
