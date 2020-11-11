import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCurveV3Component } from './chart-curve-v3.component';

describe('ChartCurveV3Component', () => {
  let component: ChartCurveV3Component;
  let fixture: ComponentFixture<ChartCurveV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCurveV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCurveV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
