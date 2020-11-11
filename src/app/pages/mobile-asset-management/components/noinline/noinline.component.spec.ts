import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoinlineComponent } from './noinline.component';

describe('NoinlineComponent', () => {
  let component: NoinlineComponent;
  let fixture: ComponentFixture<NoinlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoinlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoinlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
