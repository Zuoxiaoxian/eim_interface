import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoIntegrationComponent } from './video-integration.component';

describe('VideoIntegrationComponent', () => {
  let component: VideoIntegrationComponent;
  let fixture: ComponentFixture<VideoIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
