import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManKpiTableComponent } from './man-kpi-table.component';

describe('ManKpiTableComponent', () => {
  let component: ManKpiTableComponent;
  let fixture: ComponentFixture<ManKpiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManKpiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManKpiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
