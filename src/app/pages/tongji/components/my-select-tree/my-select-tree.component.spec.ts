import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectTreeComponent } from './my-select-tree.component';

describe('MySelectTreeComponent', () => {
  let component: MySelectTreeComponent;
  let fixture: ComponentFixture<MySelectTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySelectTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySelectTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
