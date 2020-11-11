import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAssetManagementComponent } from './mobile-asset-management.component';

describe('MobileAssetManagementComponent', () => {
  let component: MobileAssetManagementComponent;
  let fixture: ComponentFixture<MobileAssetManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAssetManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAssetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
