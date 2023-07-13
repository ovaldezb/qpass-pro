import { TestBed } from '@angular/core/testing';

import { CondominiosService } from './condominios.service';

describe('CondominiosService', () => {
  let service: CondominiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondominiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
