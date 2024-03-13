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
        timer(3000).subscribe(() => {
          this.loading = false;
        });
      });
  }

  flipCard(card: CardModel, index: number) {
    this.loading = true;
    // this.memoryGameValidator.flipCard(this.firstCard, card).subscribe(() => {
    //   this.loading = false;
    // })
    if (card.toogleFlip === true) {
      return;
    }
    this.loading = true;
    card.toogleFlip = true;
    if (this.firstCard === undefined && card.toogleFlip === true) {
      this.firstCard = card;
      this.firstCardIndex = index;
      this.loading = false;
      return;
    }
    if (
      this.firstCard?.id === card.id &&
      this.firstCardIndex !== index &&
      card.toogleFlip === true
    ) {
      timer(1000).subscribe(() => {
        if (this.firstCard !== undefined) {
          this.firstCard.hiddenCard = true;
          this.firstCard = undefined;
        }
        card.hiddenCard = true;
        this.loading = false;
      });
      return;
    }
    if (
      this.firstCard !== undefined &&
      this.firstCard?.id !== card.id &&
      this.firstCardIndex !== index &&
      card.toogleFlip === true
    ) {
      timer(2000).subscribe(() => {
        if (this.firstCard) {
          this.firstCard.toogleFlip = false;
          this.firstCard = undefined;
        }
        card.toogleFlip = false;
        this.loading = false;
      });
    }
  }

  ngOnInit(): void {
    this.getCards();
  }
}
