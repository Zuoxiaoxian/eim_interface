import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInformationV2Component } from './test-information-v2.component';

describe('TestInformationV2Component', () => {
  let component: TestInformationV2Component;
  let fixture: ComponentFixture<TestInformationV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInformationV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInformationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
