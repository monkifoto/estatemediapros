import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tour3dSectionComponent } from './tour3d-section.component';

describe('Tour3dSectionComponent', () => {
  let component: Tour3dSectionComponent;
  let fixture: ComponentFixture<Tour3dSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tour3dSectionComponent]
    });
    fixture = TestBed.createComponent(Tour3dSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
