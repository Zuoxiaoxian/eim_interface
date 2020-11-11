import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinstallDialogComponent } from './preinstall-dialog.component';

describe('PreinstallDialogComponent', () => {
  let component: PreinstallDialogComponent;
  let fixture: ComponentFixture<PreinstallDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinstallDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinstallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
