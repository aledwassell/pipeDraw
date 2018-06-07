import { TestBed, inject } from '@angular/core/testing';

import { MineService } from './mine.service';

describe('MineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MineService]
    });
  });

  it('should be created', inject([MineService], (service: MineService) => {
    expect(service).toBeTruthy();
  }));
});
