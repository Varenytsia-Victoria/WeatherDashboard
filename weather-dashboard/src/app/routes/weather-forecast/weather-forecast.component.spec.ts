import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

class MockWeatherService {
  getForecast(city: string) {
    return of({
      list: [
        {
          dt_txt: '2024-12-10 09:00:00',
          main: { temp: 10 },
          weather: [{ main: 'Clear', description: 'Clear sky' }],
        },
        {
          dt_txt: '2024-12-11 09:00:00',
          main: { temp: 12 },
          weather: [{ main: 'Clouds', description: 'Few clouds' }],
        },
      ],
    });
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let weatherService: MockWeatherService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForecastComponent],
      imports: [CommonModule, RouterTestingModule],
      providers: [
        { provide: WeatherService, useClass: MockWeatherService },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'Kyiv' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getForecast and populate forecast on ngOnInit', () => {
    spyOn(weatherService, 'getForecast').and.callThrough();
    fixture.detectChanges(); // Trigger ngOnInit

    expect(weatherService.getForecast).toHaveBeenCalledWith('Kyiv');
    expect(component.forecast.length).toBeGreaterThan(0);
    expect(component.loading).toBeFalse();
  });

  it('should filter forecast data correctly', () => {
    const data = [
      {
        dt_txt: '2024-12-10 09:00:00',
        main: { temp: 10 },
        weather: [{ main: 'Clear', description: 'Clear sky' }],
      },
      {
        dt_txt: '2024-12-10 10:00:00',
        main: { temp: 12 },
        weather: [{ main: 'Clouds', description: 'Few clouds' }],
      },
    ];


  });

  it('should group forecast by date correctly', () => {
    const data = [
      {
        dt_txt: '2024-12-10 09:00:00',
        main: { temp: 10 },
        weather: [{ main: 'Clear' }],
      },
      {
        dt_txt: '2024-12-10 12:00:00',
        main: { temp: 12 },
        weather: [{ main: 'Clouds' }],
      },
      {
        dt_txt: '2024-12-11 09:00:00',
        main: { temp: 14 },
        weather: [{ main: 'Rain' }],
      },
    ];

  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle errors gracefully in ngOnInit', () => {
    spyOn(weatherService, 'getForecast').and.returnValue(
      throwError(() => new Error('Error'))
    );
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.loading).toBeFalse();
    // Optionally, check if error was logged
  });
});
