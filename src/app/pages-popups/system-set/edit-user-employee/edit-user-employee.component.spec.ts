import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserEmployeeComponent } from './edit-user-employee.component';

describe('EditUserEmployeeComponent', () => {
  let component: EditUserEmployeeComponent;
  let fixture: ComponentFixture<EditUserEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
