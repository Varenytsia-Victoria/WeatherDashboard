import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const mockWeatherResponse = {
    name: 'Kyiv',
    main: { temp: 15 },
    weather: [{ main: 'Sunny' }],
  };

  const mockForecastResponse = {
    list: [
      {
        dt_txt: '2024-12-10 09:00:00',
        main: { temp: 10 },
        weather: [{ main: 'Rain' }],
      },
      {
        dt_txt: '2024-12-10 12:00:00',
        main: { temp: 12 },
        weather: [{ main: 'Cloudy' }],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather for a city', (done) => {
    service.getWeather('Kyiv').subscribe((response) => {
      expect(response).toEqual(mockWeatherResponse);
      done();
    });

    const req = httpMock.expectOne(
      `${environment.weatherApiUrl}/weather?q=Kyiv&appid=${environment.weatherApiKey}&units=metric`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherResponse);
  });

  it('should handle errors when fetching current weather', (done) => {
    service.getWeather('InvalidCity').subscribe({
      error: (error) => {
        expect(error.message).toBe('Not found');
        done();
      },
    });

    const req = httpMock.expectOne(
      `${environment.weatherApiUrl}/weather?q=InvalidCity&appid=${environment.weatherApiKey}&units=metric`
    );
    req.flush('City not found', { status: 404, statusText: 'Not Found' });
  });

  it('should fetch forecast for a city', (done) => {
    service.getForecast('Kyiv').subscribe((response) => {
      expect(response).toEqual(mockForecastResponse);
      done();
    });

    const req = httpMock.expectOne(
      `${environment.weatherApiUrl}/forecast?q=Kyiv&appid=${environment.weatherApiKey}&units=metric`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockForecastResponse);
  });

  it('should handle errors when fetching forecast', (done) => {
    service.getForecast('InvalidCity').subscribe({
      error: (error) => {
        expect(error.message).toBe('Not Found');
        done();
      },
    });

    const req = httpMock.expectOne(
      `${environment.weatherApiUrl}/forecast?q=InvalidCity&appid=${environment.weatherApiKey}&units=metric`
    );
    req.flush('City not found', { status: 404, statusText: 'Not Found' });
  });

  it('should update loading$ state correctly', () => {
    let loadingStates: boolean[] = [];
    service.loading$.subscribe((state) => loadingStates.push(state));

    service.getWeather('Kyiv').subscribe();

    const req = httpMock.expectOne(
      `${environment.weatherApiUrl}/weather?q=Kyiv&appid=${environment.weatherApiKey}&units=metric`
    );
    req.flush(mockWeatherResponse);

    expect(loadingStates).toEqual([false, true, false]);
  });
});
