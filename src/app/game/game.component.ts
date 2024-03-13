import { Component } from '@angular/core';
import { CardModel, CardsModel } from '@app/models/card-model';
import { HttpPokemonCardsService } from '@app/game/http-services/http-pokemon-cards.service';
import { MemoryGameValidatorService } from './util-services/memory-game-validator-service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  public doubleCards: CardModel[] = [];
  public filter = { pageSize: 5, page: Math.floor(Math.random() * 2728) };
  public loading: boolean = false;
  public firstCard?: CardModel;
  public secondCard?: CardModel;
  public firstCardIndex?: number;

  constructor(
    private httpPokemonCards: HttpPokemonCardsService,
    private memoryGameValidator: MemoryGameValidatorService
  ) {}

  public getCards() {
    this.loading = true;
    this.httpPokemonCards
      .getCards(this.filter)
      .subscribe((response: CardsModel) => {
        this.doubleCards = [...response.cards, ...response.cards]
          .map((card) => ({ ...card }))
          .sort(() => Math.random() - 0.5);
        this.loading = false;
      });
  }

  flipCard(card: CardModel, index: number) {
    // this.memoryGameValidator.flipCard(this.firstCard, card).subscribe(() => {
    //   this.loading = false;
    // })
    if (card.toogleFlip === true || this.secondCard?.toogleFlip === true) {
      return;
    }
    card.toogleFlip = true;
    if (this.firstCard === undefined) {
      this.firstCard = card;
      this.firstCardIndex = index;
      return;
    }
    if (this.firstCard !== undefined && this.secondCard === undefined) {
      this.secondCard = card;
    }
    if (
      this.firstCard?.id === this.secondCard?.id &&
      this.firstCardIndex !== index
    ) {
      timer(2000).subscribe(() => {
        if (this.firstCard !== undefined) {
          this.firstCard.hiddenCard = true;
          this.firstCard = undefined;
        }
        if (this.secondCard !== undefined) {
          this.secondCard.hiddenCard = true;
          this.secondCard = undefined;
        }
      });
      return;
    }
    if (
      this.firstCard?.id !== this.secondCard?.id &&
      this.firstCardIndex !== index
    ) {
      timer(2000).subscribe(() => {
        if (this.firstCard && this.secondCard !== undefined) {
          this.firstCard.toogleFlip = false;
          this.firstCard = undefined;
          this.secondCard.toogleFlip = false;
          this.secondCard = undefined;
        }
      });
    }
  }

  ngOnInit(): void {
    this.getCards();
  }
}
