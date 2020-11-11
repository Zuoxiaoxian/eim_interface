import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProgressForTableComponent } from './task-progress-for-table.component';

describe('TaskProgressForTableComponent', () => {
  let component: TaskProgressForTableComponent;
  let fixture: ComponentFixture<TaskProgressForTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskProgressForTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskProgressForTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
