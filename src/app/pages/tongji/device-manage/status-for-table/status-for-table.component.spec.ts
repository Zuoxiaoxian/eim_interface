import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusForTableComponent } from './status-for-table.component';

describe('StatusForTableComponent', () => {
  let component: StatusForTableComponent;
  let fixture: ComponentFixture<StatusForTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusForTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusForTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
