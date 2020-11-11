import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCurveComponent } from './chart-curve.component';

describe('ChartCurveComponent', () => {
  let component: ChartCurveComponent;
  let fixture: ComponentFixture<ChartCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
