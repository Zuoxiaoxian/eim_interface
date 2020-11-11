import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceKpiReportComponent } from './device-kpi-report.component';

describe('DeviceKpiReportComponent', () => {
  let component: DeviceKpiReportComponent;
  let fixture: ComponentFixture<DeviceKpiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceKpiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceKpiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
