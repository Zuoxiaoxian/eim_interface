import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTableNg2Component } from './my-table-ng2.component';

describe('MyTableNg2Component', () => {
  let component: MyTableNg2Component;
  let fixture: ComponentFixture<MyTableNg2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTableNg2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTableNg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
