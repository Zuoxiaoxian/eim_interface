import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndonComponent } from './andon.component';

describe('AndonComponent', () => {
  let component: AndonComponent;
  let fixture: ComponentFixture<AndonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
