import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpireportLinkFortableComponent } from './kpireport-link-fortable.component';

describe('KpireportLinkFortableComponent', () => {
  let component: KpireportLinkFortableComponent;
  let fixture: ComponentFixture<KpireportLinkFortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpireportLinkFortableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpireportLinkFortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
