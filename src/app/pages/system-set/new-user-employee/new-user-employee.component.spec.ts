import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserEmployeeComponent } from './new-user-employee.component';

describe('NewUserEmployeeComponent', () => {
  let component: NewUserEmployeeComponent;
  let fixture: ComponentFixture<NewUserEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
