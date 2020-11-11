import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManHourKpiReport2Component } from './man-hour-kpi-report2.component';

describe('ManHourKpiReport2Component', () => {
  let component: ManHourKpiReport2Component;
  let fixture: ComponentFixture<ManHourKpiReport2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManHourKpiReport2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManHourKpiReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
