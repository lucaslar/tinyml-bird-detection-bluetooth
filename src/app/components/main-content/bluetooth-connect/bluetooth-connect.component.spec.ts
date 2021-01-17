import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothConnectComponent } from './bluetooth-connect.component';

describe('BluetoothConnectComponent', () => {
  let component: BluetoothConnectComponent;
  let fixture: ComponentFixture<BluetoothConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BluetoothConnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
