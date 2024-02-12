import { TestBed } from '@angular/core/testing';

import { TernaserviceService } from './ternaservice.service';

describe('TernaserviceService', () => {
  let service: TernaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TernaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
