import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothContentComponent } from './bluetooth-content.component';

describe('BluetoothContentComponent', () => {
  let component: BluetoothContentComponent;
  let fixture: ComponentFixture<BluetoothContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BluetoothContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
