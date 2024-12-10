import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-city',
  imports: [FormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.sass',
})
export class AddCityComponent {
  city = '';
  @Output() cityAdded = new EventEmitter<string>();

  addCity() {
    if (this.city.trim()) {
      this.cityAdded.emit(this.city.trim());
      this.city = '';
    }
  }
}
