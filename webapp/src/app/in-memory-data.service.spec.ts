import { TestBed, inject } from '@angular/core/testing';

import { InMemoryMatchService } from './in-memory-match.service';

describe('InMemoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryMatchService]
    });
  });

  it('should be created', inject([InMemoryMatchService], (service: InMemoryMatchService) => {
    expect(service).toBeTruthy();
  }));
});
