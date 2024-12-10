import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let mockWeatherService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', [
      'getForecast',
    ]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('Kyiv'),
        },
      },
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WeatherForecastComponent],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and process forecast data on initialization', () => {
    const mockForecastData = {
      list: [
        { dt_txt: '2024-12-10 09:00:00', weather: [{ main: 'Sunny' }] },
        { dt_txt: '2024-12-10 12:00:00', weather: [{ main: 'Cloudy' }] },
        { dt_txt: '2024-12-11 09:00:00', weather: [{ main: 'Rainy' }] },
      ],
    };

    mockWeatherService.getForecast.and.returnValue(of(mockForecastData));

    component.ngOnInit();

    expect(component.forecast).toEqual([
      {
        date: '2024-12-10',
        forecast: [
          { dt_txt: '2024-12-10 09:00:00', weather: [{ main: 'Sunny' }] },
        ],
      },
      {
        date: '2024-12-11',
        forecast: [
          { dt_txt: '2024-12-11 09:00:00', weather: [{ main: 'Rainy' }] },
        ],
      },
    ]);
    expect(component.loading).toBeFalse();
  });

  it('should handle errors when fetching forecast data', () => {
    mockWeatherService.getForecast.and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(component.forecast).toEqual([]);
    expect(component.loading).toBeFalse();
  });

  it('should group forecast data by date correctly', () => {
    const data = [
      { dt_txt: '2024-12-10 09:00:00', weather: [{ main: 'Sunny' }] },
      { dt_txt: '2024-12-10 12:00:00', weather: [{ main: 'Cloudy' }] },
      { dt_txt: '2024-12-11 09:00:00', weather: [{ main: 'Rainy' }] },
    ];

    const groupedData = component.groupByDate(data);

    expect(groupedData).toEqual({
      '2024-12-10': [
        { dt_txt: '2024-12-10 09:00:00', weather: [{ main: 'Sunny' }] },
        { dt_txt: '2024-12-10 12:00:00', weather: [{ main: 'Cloudy' }] },
      ],
      '2024-12-11': [
        { dt_txt: '2024-12-11 09:00:00', weather: [{ main: 'Rainy' }] },
      ],
    });
  });

  it('should navigate back to the main page when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
