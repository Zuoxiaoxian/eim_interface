import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSetComponent } from './system-set.component';

describe('SystemSetComponent', () => {
  let component: SystemSetComponent;
  let fixture: ComponentFixture<SystemSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
