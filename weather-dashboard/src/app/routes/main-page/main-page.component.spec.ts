import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError } from 'rxjs';
import { AddCityComponent } from '../../components/add-city/add-city.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let mockWeatherService: any;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj(
      'WeatherService',
      ['getWeather'],
      {
        loading$: of(false),
      }
    );

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        MainPageComponent,
        AddCityComponent,
        WeatherCardComponent,
        ModalComponent,
      ],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities from localStorage on initialization', () => {
    const mockCities = JSON.stringify([
      { name: 'Kyiv', temp: 20, condition: 'Sunny' },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(mockCities);

    component.ngOnInit();
    expect(component.cities).toEqual([
      { name: 'Kyiv', temp: 20, condition: 'Sunny' },
    ]);
  });

  it('should add a new city successfully', () => {
    const mockCityResponse = {
      name: 'Kyiv',
      main: { temp: 20 },
      weather: [{ main: 'Sunny' }],
    };
    mockWeatherService.getWeather.and.returnValue(of(mockCityResponse));

    component.addCity('Kyiv');
    expect(component.cities).toEqual([
      { name: 'Kyiv', temp: 20, condition: 'Sunny' },
    ]);
    expect(localStorage.getItem('cities')).toContain('Kyiv');
  });

  it('should show error modal when city is not found', () => {
    mockWeatherService.getWeather.and.returnValue(throwError('City not found'));

    component.addCity('UnknownCity');
    expect(component.errorMessage).toBe('City not found');
    expect(component.showModal).toBeTrue();
  });

  it('should remove a city', () => {
    component.cities = [
      { name: 'Kyiv', temp: 20, condition: 'Sunny' },
      { name: 'Lviv', temp: 18, condition: 'Cloudy' },
    ];

    component.removeCity('Kyiv');
    expect(component.cities).toEqual([
      { name: 'Lviv', temp: 18, condition: 'Cloudy' },
    ]);
    expect(localStorage.getItem('cities')).not.toContain('Kyiv');
  });

  it('should close the modal', () => {
    component.showModal = true;

    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
