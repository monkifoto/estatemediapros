import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingComponent } from './staging.component';

describe('StagingComponent', () => {
  let component: StagingComponent;
  let fixture: ComponentFixture<StagingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagingComponent]
    });
    fixture = TestBed.createComponent(StagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
