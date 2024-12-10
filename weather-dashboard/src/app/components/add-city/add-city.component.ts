import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

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

  addCity() {
    const savedCities = JSON.parse(localStorage.getItem('cities') || '[]'); 

    const cityExists = savedCities.some(
      (savedCity: { name: string }) =>
        savedCity.name.toLowerCase() === this.city.trim().toLowerCase()
    );

    if (this.city.trim() === '') {
      this.errorMessage = 'Please enter a valid city name';
      this.showModal = true;
    } else if (cityExists) {
      this.errorMessage = 'This city is already added';
      this.showModal = true; 
    } else {
      this.cityAdded.emit(this.city.trim());
      this.city = ''; 
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
