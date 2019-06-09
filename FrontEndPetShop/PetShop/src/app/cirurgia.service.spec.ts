import { TestBed } from '@angular/core/testing';

import { CirurgiaService } from './cirurgia.service';

describe('CirurgiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CirurgiaService = TestBed.get(CirurgiaService);
    expect(service).toBeTruthy();
  });
});
