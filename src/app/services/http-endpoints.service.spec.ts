import { TestBed } from '@angular/core/testing';

import { HttpEndpointsService } from './http-endpoints.service';

describe('HttpEndpointsService', () => {
  let service: HttpEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
