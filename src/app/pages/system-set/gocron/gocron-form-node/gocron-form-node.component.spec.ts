import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GocronFormNodeComponent } from './gocron-form-node.component';

describe('GocronFormNodeComponent', () => {
  let component: GocronFormNodeComponent;
  let fixture: ComponentFixture<GocronFormNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GocronFormNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GocronFormNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
