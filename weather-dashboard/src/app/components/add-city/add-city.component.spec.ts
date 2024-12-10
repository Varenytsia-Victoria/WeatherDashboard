import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddCityComponent } from './add-city.component';
import { ModalComponent } from '../modal/modal.component';
import { By } from '@angular/platform-browser';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCityComponent, ModalComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not add a city if the input is empty', () => {
    component.city = '';
    component.addCity();
    expect(component.showModal).toBeTrue();
    expect(component.errorMessage).toBe('Please enter a valid city name');
  });

  it('should not add a city if it already exists', () => {
    localStorage.setItem(
      'cities',
      JSON.stringify([{ name: 'Kyiv' }, { name: 'Lviv' }])
    );

    component.city = 'Kyiv';
    component.addCity();

    expect(component.showModal).toBeTrue();
    expect(component.errorMessage).toBe('This city is already added');
  });

  it('should add a new city if it does not exist', () => {
    spyOn(component.cityAdded, 'emit');

    localStorage.setItem('cities', JSON.stringify([{ name: 'Kyiv' }]));

    component.city = 'Lviv';
    component.addCity();

    expect(component.cityAdded.emit).toHaveBeenCalledWith('Lviv');
    expect(component.city).toBe('');
    expect(component.showModal).toBeFalse();
  });

  it('should close the modal when closeModal is called', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should handle case-insensitive city duplicates', () => {
    localStorage.setItem(
      'cities',
      JSON.stringify([{ name: 'Kyiv' }, { name: 'Lviv' }])
    );

    component.city = 'kyiv';
    component.addCity();

    expect(component.showModal).toBeTrue();
    expect(component.errorMessage).toBe('This city is already added');
  });
});
