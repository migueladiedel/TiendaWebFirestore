import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerGuard } from '@auth/customer.guard';

describe('CustomerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerGuard]
    });
  });

  it('should ...', inject([CustomerGuard], (guard: CustomerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
