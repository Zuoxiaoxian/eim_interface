import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentStatusComponent } from './equipment-status.component';

describe('EquipmentStatusComponent', () => {
  let component: EquipmentStatusComponent;
  let fixture: ComponentFixture<EquipmentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
