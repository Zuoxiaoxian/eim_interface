import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHydraulicPressureComponent } from './equipment-hydraulic-pressure.component';

describe('EquipmentHydraulicPressureComponent', () => {
  let component: EquipmentHydraulicPressureComponent;
  let fixture: ComponentFixture<EquipmentHydraulicPressureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentHydraulicPressureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHydraulicPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
