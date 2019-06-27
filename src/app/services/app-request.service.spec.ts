import { TestBed } from '@angular/core/testing';

import { AppRequestService } from './app-request.service';

describe('AppRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRequestService = TestBed.get(AppRequestService);
    expect(service).toBeTruthy();
  });
});
