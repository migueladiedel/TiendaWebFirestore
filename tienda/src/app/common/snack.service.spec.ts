import { TestBed, inject } from '@angular/core/testing';

import { SnackService } from './snack.service';

describe('SnackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackService]
    });
  });

  it('should be created', inject([SnackService], (service: SnackService) => {
    expect(service).toBeTruthy();
  }));
});
