import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStagingGalleryComponent } from './virtual-staging-gallery.component';

describe('VirtualStagingGalleryComponent', () => {
  let component: VirtualStagingGalleryComponent;
  let fixture: ComponentFixture<VirtualStagingGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualStagingGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualStagingGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
