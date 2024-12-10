import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() message: string = ''; 
  @Output() closeModal = new EventEmitter<void>();

  show: boolean = false; 

  ngOnInit() {
    setTimeout(() => {
      this.show = true; 
    }, 100);
  }

  close() {
    this.show = false; 
    setTimeout(() => {
      this.closeModal.emit(); 
    }, 500); 
  }
}
