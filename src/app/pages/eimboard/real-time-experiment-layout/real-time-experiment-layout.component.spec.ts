import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeExperimentLayoutComponent } from './real-time-experiment-layout.component';

describe('RealTimeExperimentLayoutComponent', () => {
  let component: RealTimeExperimentLayoutComponent;
  let fixture: ComponentFixture<RealTimeExperimentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeExperimentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeExperimentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
