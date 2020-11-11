import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserEmployeeGroupComponent } from './edit-user-employee-group.component';

describe('EditUserEmployeeGroupComponent', () => {
  let component: EditUserEmployeeGroupComponent;
  let fixture: ComponentFixture<EditUserEmployeeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserEmployeeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserEmployeeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
