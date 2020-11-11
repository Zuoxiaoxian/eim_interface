import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFourRoadComponent } from './equipment-four-road.component';

describe('EquipmentFourRoadComponent', () => {
  let component: EquipmentFourRoadComponent;
  let fixture: ComponentFixture<EquipmentFourRoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentFourRoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentFourRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
