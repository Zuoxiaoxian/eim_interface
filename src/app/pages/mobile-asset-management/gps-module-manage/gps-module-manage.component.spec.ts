import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsModuleManageComponent } from './gps-module-manage.component';

describe('GpsModuleManageComponent', () => {
  let component: GpsModuleManageComponent;
  let fixture: ComponentFixture<GpsModuleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsModuleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsModuleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
