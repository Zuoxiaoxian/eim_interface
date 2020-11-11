import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManhourReportLinkFortableComponent } from './manhour-report-link-fortable.component';

describe('ManhourReportLinkFortableComponent', () => {
  let component: ManhourReportLinkFortableComponent;
  let fixture: ComponentFixture<ManhourReportLinkFortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManhourReportLinkFortableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManhourReportLinkFortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
