import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMastV2Component } from './equipment-mast-v2.component';

describe('EquipmentMastV2Component', () => {
  let component: EquipmentMastV2Component;
  let fixture: ComponentFixture<EquipmentMastV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMastV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMastV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
