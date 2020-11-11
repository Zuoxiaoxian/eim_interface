import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPopupsComponent } from './pages-popups.component';

describe('PagesPopupsComponent', () => {
  let component: PagesPopupsComponent;
  let fixture: ComponentFixture<PagesPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
