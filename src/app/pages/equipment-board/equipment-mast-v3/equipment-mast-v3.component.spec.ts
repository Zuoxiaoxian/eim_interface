import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMastV3Component } from './equipment-mast-v3.component';

describe('EquipmentMastV3Component', () => {
  let component: EquipmentMastV3Component;
  let fixture: ComponentFixture<EquipmentMastV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMastV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMastV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
