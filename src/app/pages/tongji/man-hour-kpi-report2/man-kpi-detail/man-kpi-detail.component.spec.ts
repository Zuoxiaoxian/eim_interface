import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManKpiDetailComponent } from './man-kpi-detail.component';

describe('ManKpiDetailComponent', () => {
  let component: ManKpiDetailComponent;
  let fixture: ComponentFixture<ManKpiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManKpiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManKpiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
