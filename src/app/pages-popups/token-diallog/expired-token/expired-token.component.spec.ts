import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredTokenComponent } from './expired-token.component';

describe('ExpiredTokenComponent', () => {
  let component: ExpiredTokenComponent;
  let fixture: ComponentFixture<ExpiredTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
