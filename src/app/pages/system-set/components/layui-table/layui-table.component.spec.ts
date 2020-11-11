import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayuiTableComponent } from './layui-table.component';

describe('LayuiTableComponent', () => {
  let component: LayuiTableComponent;
  let fixture: ComponentFixture<LayuiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayuiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayuiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
