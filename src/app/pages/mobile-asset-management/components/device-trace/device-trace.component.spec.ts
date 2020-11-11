import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTraceComponent } from './device-trace.component';

describe('DeviceTraceComponent', () => {
  let component: DeviceTraceComponent;
  let fixture: ComponentFixture<DeviceTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
