import { Injectable } from '@angular/core';
import { CardModel } from '@app/models/card-model';
import { Observable, timer } from 'rxjs';

@Injectable()
export class MemoryGameValidatorService {
  flipCard(
    firstCard: CardModel | undefined,
    secondCard: CardModel | undefined
  ): Observable<void> {
    return new Observable<void>((observer) => {
      observer.complete();
    });
  }
}
