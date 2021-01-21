import { TestBed } from '@angular/core/testing';

import { ApiMobileService } from './api-mobile.service';

describe('ApiMobileService', () => {
  let service: ApiMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
