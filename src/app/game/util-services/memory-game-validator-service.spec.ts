import { TestBed } from '@angular/core/testing';

import { MemoryGameValidatorService } from './memory-game-validator-service';

describe('MemoryGameRulesValidatorService', () => {
  let service: MemoryGameValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryGameValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
