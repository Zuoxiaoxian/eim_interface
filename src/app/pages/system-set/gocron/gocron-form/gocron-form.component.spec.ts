import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GocronFormComponent } from './gocron-form.component';

describe('GocronFormComponent', () => {
  let component: GocronFormComponent;
  let fixture: ComponentFixture<GocronFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GocronFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GocronFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
