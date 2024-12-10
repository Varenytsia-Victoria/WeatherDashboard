import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message passed as input', () => {
    component.message = 'Test message';
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(
      By.css('.modal-content')
    ).nativeElement;
    expect(messageElement.textContent).toContain('Test message');
  });

  it('should initially not show the modal', () => {
    expect(component.show).toBeFalse();
  });

  it('should show the modal after a delay on initialization', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.show).toBeTrue();
      done();
    }, 150);
  });

  it('should emit closeModal event when close is called', (done) => {
    spyOn(component.closeModal, 'emit');
    component.show = true;
    component.close();
    setTimeout(() => {
      expect(component.show).toBeFalse();
      expect(component.closeModal.emit).toHaveBeenCalled();
      done();
    }, 600);
  });

  it('should toggle visibility with animations when closed', (done) => {
    component.show = true;
    component.close();
    expect(component.show).toBeFalse();
    setTimeout(() => {
      expect(component.closeModal.emit).toHaveBeenCalled();
      done();
    }, 600);
  });
});
