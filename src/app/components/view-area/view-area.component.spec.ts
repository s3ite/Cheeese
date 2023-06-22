import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAreaComponent } from './view-area.component';

describe('ViewAreaComponent', () => {
  let component: ViewAreaComponent;
  let fixture: ComponentFixture<ViewAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAreaComponent]
    });
    fixture = TestBed.createComponent(ViewAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
