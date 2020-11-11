import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceKpiReport2Component } from './device-kpi-report2.component';

describe('DeviceKpiReport2Component', () => {
  let component: DeviceKpiReport2Component;
  let fixture: ComponentFixture<DeviceKpiReport2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceKpiReport2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceKpiReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
