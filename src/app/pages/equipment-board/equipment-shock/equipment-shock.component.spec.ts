import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentShockComponent } from './equipment-shock.component';

describe('EquipmentShockComponent', () => {
  let component: EquipmentShockComponent;
  let fixture: ComponentFixture<EquipmentShockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentShockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentShockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
