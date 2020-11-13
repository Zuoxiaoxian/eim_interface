import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryBoardComponent } from './laboratory-board.component';

describe('LaboratoryBoardComponent', () => {
  let component: LaboratoryBoardComponent;
  let fixture: ComponentFixture<LaboratoryBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
