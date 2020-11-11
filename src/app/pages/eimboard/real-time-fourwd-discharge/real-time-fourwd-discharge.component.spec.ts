import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeFourwdDischargeComponent } from './real-time-fourwd-discharge.component';

describe('RealTimeFourwdDischargeComponent', () => {
  let component: RealTimeFourwdDischargeComponent;
  let fixture: ComponentFixture<RealTimeFourwdDischargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeFourwdDischargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeFourwdDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
