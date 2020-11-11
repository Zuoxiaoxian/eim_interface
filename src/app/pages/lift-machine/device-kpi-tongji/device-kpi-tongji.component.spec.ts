import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceKpiTongjiComponent } from './device-kpi-tongji.component';

describe('DeviceKpiTongjiComponent', () => {
  let component: DeviceKpiTongjiComponent;
  let fixture: ComponentFixture<DeviceKpiTongjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceKpiTongjiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceKpiTongjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
