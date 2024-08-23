import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorplanSectionComponent } from './floorplan-section.component';

describe('FloorplanSectionComponent', () => {
  let component: FloorplanSectionComponent;
  let fixture: ComponentFixture<FloorplanSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorplanSectionComponent]
    });
    fixture = TestBed.createComponent(FloorplanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
