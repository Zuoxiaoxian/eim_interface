import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManHourKpiReportComponent } from './man-hour-kpi-report.component';

describe('ManHourKpiReportComponent', () => {
  let component: ManHourKpiReportComponent;
  let fixture: ComponentFixture<ManHourKpiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManHourKpiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManHourKpiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
