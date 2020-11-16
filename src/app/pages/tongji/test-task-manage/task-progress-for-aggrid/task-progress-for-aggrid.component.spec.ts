import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProgressForAggridComponent } from './task-progress-for-aggrid.component';

describe('TaskProgressForAggridComponent', () => {
  let component: TaskProgressForAggridComponent;
  let fixture: ComponentFixture<TaskProgressForAggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskProgressForAggridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskProgressForAggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
