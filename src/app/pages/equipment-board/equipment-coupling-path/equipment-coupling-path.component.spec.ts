import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCouplingPathComponent } from './equipment-coupling-path.component';

describe('EquipmentCouplingPathComponent', () => {
  let component: EquipmentCouplingPathComponent;
  let fixture: ComponentFixture<EquipmentCouplingPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCouplingPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCouplingPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
