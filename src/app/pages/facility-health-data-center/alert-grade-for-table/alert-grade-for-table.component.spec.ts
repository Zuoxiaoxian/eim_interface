import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGradeForTableComponent } from './alert-grade-for-table.component';

describe('AlertGradeForTableComponent', () => {
  let component: AlertGradeForTableComponent;
  let fixture: ComponentFixture<AlertGradeForTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertGradeForTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGradeForTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
