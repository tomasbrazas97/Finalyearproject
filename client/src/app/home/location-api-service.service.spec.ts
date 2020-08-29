import { TestBed } from '@angular/core/testing';

import { LocationApiService } from './locationApiService.service';

describe('LocationApiServiceService', () => {
  let service: LocationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
