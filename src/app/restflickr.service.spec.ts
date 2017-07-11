import { TestBed, inject } from '@angular/core/testing';

import { RestflickrService } from './restflickr.service';

describe('RestflickrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestflickrService]
    });
  });

  it('should be created', inject([RestflickrService], (service: RestflickrService) => {
    expect(service).toBeTruthy();
  }));
});
