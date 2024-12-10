import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

interface City {
  name: string;
}

@Component({
  selector: 'app-add-city',
  imports: [FormsModule, ModalComponent],
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent {
  city = '';
  @Output() cityAdded = new EventEmitter<string>();

  showModal: boolean = false;
  errorMessage: string = '';

  private static readonly ERROR_MESSAGES = {
    emptyCity: 'Please enter a valid city name',
    cityExists: 'This city is already added',
  };

  addCity(): void {
    const savedCities: City[] = JSON.parse(
      localStorage.getItem('cities') || '[]'
    );

    const cityExists = savedCities.some(
      (savedCity) =>
        savedCity.name.toLowerCase() === this.city.trim().toLowerCase()
    );

    if (this.city.trim() === '') {
      this.errorMessage = AddCityComponent.ERROR_MESSAGES.emptyCity;
      this.showModal = true;
    } else if (cityExists) {
      this.errorMessage = AddCityComponent.ERROR_MESSAGES.cityExists;
      this.showModal = true;
    } else {
      this.cityAdded.emit(this.city.trim());
      this.city = '';
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
