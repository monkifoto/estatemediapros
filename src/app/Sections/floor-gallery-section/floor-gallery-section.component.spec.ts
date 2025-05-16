import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorGallerySectionComponent } from './floor-gallery-section.component';

describe('FloorGallerySectionComponent', () => {
  let component: FloorGallerySectionComponent;
  let fixture: ComponentFixture<FloorGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorGallerySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
