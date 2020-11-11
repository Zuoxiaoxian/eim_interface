import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBoardComponent } from './equipment-board.component';

describe('EquipmentBoardComponent', () => {
  let component: EquipmentBoardComponent;
  let fixture: ComponentFixture<EquipmentBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
