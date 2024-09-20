import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSectionComponent } from './shopping-section.component';

describe('ShoppingSectionComponent', () => {
  let component: ShoppingSectionComponent;
  let fixture: ComponentFixture<ShoppingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingSectionComponent]
    });
    fixture = TestBed.createComponent(ShoppingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
