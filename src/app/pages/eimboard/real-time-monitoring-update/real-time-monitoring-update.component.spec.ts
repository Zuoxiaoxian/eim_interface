import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeMonitoringUpdateComponent } from './real-time-monitoring-update.component';

describe('RealTimeMonitoringUpdateComponent', () => {
  let component: RealTimeMonitoringUpdateComponent;
  let fixture: ComponentFixture<RealTimeMonitoringUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeMonitoringUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeMonitoringUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
