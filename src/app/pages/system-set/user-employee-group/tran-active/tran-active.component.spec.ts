import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranActiveComponent } from './tran-active.component';

describe('TranActiveComponent', () => {
  let component: TranActiveComponent;
  let fixture: ComponentFixture<TranActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
