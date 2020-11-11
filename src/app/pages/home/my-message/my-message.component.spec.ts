import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMessageComponent } from './my-message.component';

describe('MyMessageComponent', () => {
  let component: MyMessageComponent;
  let fixture: ComponentFixture<MyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
