import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectGroupComponent } from './my-select-group.component';

describe('MySelectGroupComponent', () => {
  let component: MySelectGroupComponent;
  let fixture: ComponentFixture<MySelectGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySelectGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySelectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
