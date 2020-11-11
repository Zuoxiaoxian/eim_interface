import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmployeeGroupComponent } from './user-employee-group.component';

describe('UserEmployeeGroupComponent', () => {
  let component: UserEmployeeGroupComponent;
  let fixture: ComponentFixture<UserEmployeeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEmployeeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmployeeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
