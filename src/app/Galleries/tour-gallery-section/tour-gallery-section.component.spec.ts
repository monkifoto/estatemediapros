import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourGallerySectionComponent } from './tour-gallery-section.component';

describe('TourGallerySectionComponent', () => {
  let component: TourGallerySectionComponent;
  let fixture: ComponentFixture<TourGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourGallerySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
