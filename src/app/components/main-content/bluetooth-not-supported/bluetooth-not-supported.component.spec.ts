import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothNotSupportedComponent } from './bluetooth-not-supported.component';

describe('BluetoothNotSupportedComponent', () => {
  let component: BluetoothNotSupportedComponent;
  let fixture: ComponentFixture<BluetoothNotSupportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BluetoothNotSupportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothNotSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
