import { TestBed } from '@angular/core/testing';

import { HttpPokemonCardsService } from './http-pokemon-cards.service';

describe('PokemonCardService', () => {
  let service: HttpPokemonCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPokemonCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
