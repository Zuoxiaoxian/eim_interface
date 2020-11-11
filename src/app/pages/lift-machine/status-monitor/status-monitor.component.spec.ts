import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMonitorComponent } from './status-monitor.component';

describe('StatusMonitorComponent', () => {
  let component: StatusMonitorComponent;
  let fixture: ComponentFixture<StatusMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
