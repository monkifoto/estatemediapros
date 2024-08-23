import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingSectionComponent } from './staging-section.component';

describe('StagingSectionComponent', () => {
  let component: StagingSectionComponent;
  let fixture: ComponentFixture<StagingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagingSectionComponent]
    });
    fixture = TestBed.createComponent(StagingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
