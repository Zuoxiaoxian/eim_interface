import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TongjiReportComponent } from './tongji-report.component';

describe('TongjiReportComponent', () => {
  let component: TongjiReportComponent;
  let fixture: ComponentFixture<TongjiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongjiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TongjiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
