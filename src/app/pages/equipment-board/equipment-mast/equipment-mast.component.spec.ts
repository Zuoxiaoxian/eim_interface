import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMastComponent } from './equipment-mast.component';

describe('EquipmentMastComponent', () => {
  let component: EquipmentMastComponent;
  let fixture: ComponentFixture<EquipmentMastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
