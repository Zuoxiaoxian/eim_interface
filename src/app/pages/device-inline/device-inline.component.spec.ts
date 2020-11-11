import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInlineComponent } from './device-inline.component';

describe('DeviceInlineComponent', () => {
  let component: DeviceInlineComponent;
  let fixture: ComponentFixture<DeviceInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
