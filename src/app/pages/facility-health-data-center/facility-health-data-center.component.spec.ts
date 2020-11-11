import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityHealthDataCenterComponent } from './facility-health-data-center.component';

describe('FacilityHealthDataCenterComponent', () => {
  let component: FacilityHealthDataCenterComponent;
  let fixture: ComponentFixture<FacilityHealthDataCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityHealthDataCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityHealthDataCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
