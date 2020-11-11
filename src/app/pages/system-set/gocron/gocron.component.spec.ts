import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GocronComponent } from './gocron.component';

describe('GocronComponent', () => {
  let component: GocronComponent;
  let fixture: ComponentFixture<GocronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GocronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GocronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
