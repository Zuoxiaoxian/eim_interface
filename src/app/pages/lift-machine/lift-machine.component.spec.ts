import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftMachineComponent } from './lift-machine.component';

describe('LiftMachineComponent', () => {
  let component: LiftMachineComponent;
  let fixture: ComponentFixture<LiftMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
