import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridActionComponent } from './ag-grid-action.component';

describe('AgGridActionComponent', () => {
  let component: AgGridActionComponent;
  let fixture: ComponentFixture<AgGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
