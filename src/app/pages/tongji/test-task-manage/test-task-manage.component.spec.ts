import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskManageComponent } from './test-task-manage.component';

describe('TestTaskManageComponent', () => {
  let component: TestTaskManageComponent;
  let fixture: ComponentFixture<TestTaskManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTaskManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTaskManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
