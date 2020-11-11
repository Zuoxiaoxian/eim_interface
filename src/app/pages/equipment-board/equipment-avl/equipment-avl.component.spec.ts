import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAvlComponent } from './equipment-avl.component';

describe('EquipmentAvlComponent', () => {
  let component: EquipmentAvlComponent;
  let fixture: ComponentFixture<EquipmentAvlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentAvlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentAvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
