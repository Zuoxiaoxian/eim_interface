import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationManagementComponent } from './operation-management.component';

describe('OperationManagementComponent', () => {
  let component: OperationManagementComponent;
  let fixture: ComponentFixture<OperationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
