import { TestBed } from '@angular/core/testing';

import { ImageSelectionService } from './image-selection.service';

describe('ImageSelectionService', () => {
  let service: ImageSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
