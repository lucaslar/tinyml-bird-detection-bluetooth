import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSlidesComponent } from './info-slides.component';

describe('InfoSlidesComponent', () => {
  let component: InfoSlidesComponent;
  let fixture: ComponentFixture<InfoSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSlidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
