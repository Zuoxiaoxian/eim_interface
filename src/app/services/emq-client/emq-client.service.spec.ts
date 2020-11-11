import { TestBed } from '@angular/core/testing';

import { EmqClientService } from './emq-client.service';

describe('EmqClientService', () => {
  let service: EmqClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmqClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
