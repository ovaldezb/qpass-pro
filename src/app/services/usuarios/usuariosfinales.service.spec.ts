import { TestBed } from '@angular/core/testing';

import { UsuariosfinalesService } from './usuariosfinales.service';

describe('UsuariosfinalesService', () => {
  let service: UsuariosfinalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosfinalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
