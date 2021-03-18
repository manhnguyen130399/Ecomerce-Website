import { TestBed } from '@angular/core/testing';

import { ComplainService } from './complain.service';

describe('ComplainService', () => {
  let service: ComplainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
