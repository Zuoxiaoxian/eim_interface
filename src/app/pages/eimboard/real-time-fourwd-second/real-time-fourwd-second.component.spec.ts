import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeFourwdSecondComponent } from './real-time-fourwd-second.component';

describe('RealTimeFourwdSecondComponent', () => {
  let component: RealTimeFourwdSecondComponent;
  let fixture: ComponentFixture<RealTimeFourwdSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeFourwdSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeFourwdSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
