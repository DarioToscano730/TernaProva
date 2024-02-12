import { TestBed } from '@angular/core/testing';

import { SirtiserviceService } from './sirtiservice.service';

describe('SirtiserviceService', () => {
  let service: SirtiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SirtiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
