import { TestBed } from '@angular/core/testing';

import { BlocketDataService } from './blocket-data.service';

describe('BlocketWebDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocketDataService = TestBed.get(BlocketDataService);
    expect(service).toBeTruthy();
  });
});
