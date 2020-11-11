import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDelTooltipComponent } from './edit-del-tooltip.component';

describe('EditDelTooltipComponent', () => {
  let component: EditDelTooltipComponent;
  let fixture: ComponentFixture<EditDelTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDelTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDelTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
