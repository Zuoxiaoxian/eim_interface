import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMastTwoLevelComponent } from './equipment-mast-two-level.component';

describe('EquipmentMastTwoLevelComponent', () => {
  let component: EquipmentMastTwoLevelComponent;
  let fixture: ComponentFixture<EquipmentMastTwoLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMastTwoLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMastTwoLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
