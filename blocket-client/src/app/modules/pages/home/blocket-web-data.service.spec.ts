import { TestBed } from '@angular/core/testing';

import { BlocketWebDataService } from './blocket-web-data.service';

describe('BlocketWebDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocketWebDataService = TestBed.get(BlocketWebDataService);
    expect(service).toBeTruthy();
  });
});
