import { TestBed } from '@angular/core/testing';

import { UsuariosistemaService } from './usuariosistema.service';

describe('UsuariosistemaService', () => {
  let service: UsuariosistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
