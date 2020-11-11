import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsManageComponent } from './assets-manage.component';

describe('AssetsManageComponent', () => {
  let component: AssetsManageComponent;
  let fixture: ComponentFixture<AssetsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
