import { TestBed } from '@angular/core/testing';

import { AplicacionService } from './aplicacion.service';

describe('AplicacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplicacionService = TestBed.get(AplicacionService);
    expect(service).toBeTruthy();
  });
});
