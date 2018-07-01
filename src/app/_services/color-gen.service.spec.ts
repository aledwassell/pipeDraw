import { TestBed, inject } from '@angular/core/testing';

import { ColorGenService } from './color-gen.service';

describe('ColorGenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorGenService]
    });
  });

  it('should be created', inject([ColorGenService], (service: ColorGenService) => {
    expect(service).toBeTruthy();
  }));
});
