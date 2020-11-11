import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EimboardComponent } from './eimboard.component';

describe('EimboardComponent', () => {
  let component: EimboardComponent;
  let fixture: ComponentFixture<EimboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EimboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EimboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
