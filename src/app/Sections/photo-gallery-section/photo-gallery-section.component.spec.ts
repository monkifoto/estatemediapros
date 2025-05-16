import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGallerySectionComponent } from './photo-gallery-section.component';

describe('PhotoGallerySectionComponent', () => {
  let component: PhotoGallerySectionComponent;
  let fixture: ComponentFixture<PhotoGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGallerySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
