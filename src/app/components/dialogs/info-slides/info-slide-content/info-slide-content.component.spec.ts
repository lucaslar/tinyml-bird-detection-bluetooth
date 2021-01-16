import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSlideContentComponent } from './info-slide-content.component';

describe('InfoSlideContentComponent', () => {
  let component: InfoSlideContentComponent;
  let fixture: ComponentFixture<InfoSlideContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSlideContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSlideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
