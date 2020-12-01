import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentParamsComponent } from './experiment-params.component';

describe('ExperimentParamsComponent', () => {
  let component: ExperimentParamsComponent;
  let fixture: ComponentFixture<ExperimentParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
