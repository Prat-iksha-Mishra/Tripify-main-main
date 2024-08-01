import { TestBed } from '@angular/core/testing';

import { ImageSearchWithSerpService } from './image-search-with-serp.service';

describe('ImageSearchWithSerpService', () => {
  let service: ImageSearchWithSerpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSearchWithSerpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
