import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AerialSectionComponent } from './aerial-section.component';

describe('AerialSectionComponent', () => {
  let component: AerialSectionComponent;
  let fixture: ComponentFixture<AerialSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AerialSectionComponent]
    });
    fixture = TestBed.createComponent(AerialSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
