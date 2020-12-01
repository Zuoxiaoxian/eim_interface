import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipIntroduceComponent } from './equip-introduce.component';

describe('EquipIntroduceComponent', () => {
  let component: EquipIntroduceComponent;
  let fixture: ComponentFixture<EquipIntroduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipIntroduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
