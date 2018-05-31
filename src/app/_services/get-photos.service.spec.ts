import { TestBed, inject } from '@angular/core/testing';

import { GetPhotosService } from './get-photos.service';

describe('GetPhotosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPhotosService]
    });
  });

  it('should be created', inject([GetPhotosService], (service: GetPhotosService) => {
    expect(service).toBeTruthy();
  }));
});
