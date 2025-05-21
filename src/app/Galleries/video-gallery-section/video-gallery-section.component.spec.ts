import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGallerySectionComponent } from './video-gallery-section.component';

describe('VideoGallerySectionComponent', () => {
  let component: VideoGallerySectionComponent;
  let fixture: ComponentFixture<VideoGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGallerySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
