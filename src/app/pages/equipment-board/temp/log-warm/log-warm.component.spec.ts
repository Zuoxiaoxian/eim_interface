import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWarmComponent } from './log-warm.component';

describe('LogWarmComponent', () => {
  let component: LogWarmComponent;
  let fixture: ComponentFixture<LogWarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogWarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
