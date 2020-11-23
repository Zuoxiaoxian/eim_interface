import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInformationComponent } from './test-information.component';

describe('TestInformationComponent', () => {
  let component: TestInformationComponent;
  let fixture: ComponentFixture<TestInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
