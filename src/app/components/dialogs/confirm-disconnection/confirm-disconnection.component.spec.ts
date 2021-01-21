import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDisconnectionComponent } from './confirm-disconnection.component';

describe('ConfirmDisconnectionComponent', () => {
  let component: ConfirmDisconnectionComponent;
  let fixture: ComponentFixture<ConfirmDisconnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDisconnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDisconnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
