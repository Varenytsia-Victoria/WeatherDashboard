import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;
  private apiKey = environment.weatherApiKey;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable(); // Стан індикатора завантаження

  constructor(private http: HttpClient) {}

  /**
   * Отримання погодних даних для міста
   * @param city Назва міста
   * @returns Observable з даними погоди
   */
  getWeather(city: string): Observable<any> {
    this.setLoading(true); // Увімкнення індикатора завантаження
    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get(url).pipe(
      tap(() => console.log(`Запит погоди для міста: ${city}`)), // Лог запиту
      catchError((error) => {
        console.error('Помилка при отриманні погодних даних:', error);
        return throwError(() => new Error('Місто не знайдено'));
      }),
      finalize(() => this.setLoading(false)) // Вимкнення індикатора завантаження після завершення
    );
  }

  /**
   * Отримання прогнозу погоди на кілька днів для міста
   * @param city Назва міста
   * @returns Observable з прогнозом на кілька днів
   */
  getForecast(city: string): Observable<any> {
    this.setLoading(true); // Увімкнення індикатора завантаження
    const url = `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get(url).pipe(
      tap(() => console.log(`Запит прогнозу погоди для міста: ${city}`)), // Лог запиту
      catchError((error) => {
        console.error('Помилка при отриманні прогнозу погоди:', error);
        return throwError(() => new Error('Прогноз не знайдено'));
      }),
      finalize(() => this.setLoading(false)) 
    );
  }

  /**
   * @param isLoading Стан (true/false)
   */
  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}
