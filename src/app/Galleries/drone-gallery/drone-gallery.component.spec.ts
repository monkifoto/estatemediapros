import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneGalleryComponent } from './drone-gallery.component';

describe('DroneGalleryComponent', () => {
  let component: DroneGalleryComponent;
  let fixture: ComponentFixture<DroneGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DroneGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroneGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
