import { TestBed } from '@angular/core/testing';

import { PublicmethodService } from './publicmethod.service';

describe('PublicmethodService', () => {
  let service: PublicmethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicmethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
