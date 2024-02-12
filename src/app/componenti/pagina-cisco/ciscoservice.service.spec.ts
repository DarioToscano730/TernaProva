import { TestBed } from '@angular/core/testing';

import { CiscoserviceService } from './ciscoservice.service';

describe('CiscoserviceService', () => {
  let service: CiscoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiscoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
