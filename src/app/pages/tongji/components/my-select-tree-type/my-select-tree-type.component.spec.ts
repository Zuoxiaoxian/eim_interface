import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectTreeTypeComponent } from './my-select-tree-type.component';

describe('MySelectTreeTypeComponent', () => {
  let component: MySelectTreeTypeComponent;
  let fixture: ComponentFixture<MySelectTreeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySelectTreeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySelectTreeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
