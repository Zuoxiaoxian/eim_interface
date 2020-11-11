import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationForTableComponent } from './operation-for-table.component';

describe('OperationForTableComponent', () => {
  let component: OperationForTableComponent;
  let fixture: ComponentFixture<OperationForTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationForTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationForTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
