import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualGallerySectionComponent } from './virtual-gallery-section.component';

describe('VirtualGallerySectionComponent', () => {
  let component: VirtualGallerySectionComponent;
  let fixture: ComponentFixture<VirtualGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualGallerySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
