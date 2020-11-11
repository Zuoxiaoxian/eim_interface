import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMotorSystemComponent } from './equipment-motor-system.component';

describe('EquipmentMotorSystemComponent', () => {
  let component: EquipmentMotorSystemComponent;
  let fixture: ComponentFixture<EquipmentMotorSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMotorSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMotorSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
