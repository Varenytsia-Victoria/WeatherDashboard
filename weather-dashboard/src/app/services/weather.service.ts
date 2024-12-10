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
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    this.setLoading(true);
    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get(url).pipe(
      catchError((error) => {
        return throwError(() => new Error('Not found'));
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getForecast(city: string): Observable<any> {
    this.setLoading(true); 
    const url = `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get(url).pipe(
      catchError((error) => {
        return throwError(() => new Error('Not Found'));
      }),
      finalize(() => this.setLoading(false)) 
    );
  }

  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}
