import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderGatewayComponent } from './border-gateway.component';

describe('BorderGatewayComponent', () => {
  let component: BorderGatewayComponent;
  let fixture: ComponentFixture<BorderGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
