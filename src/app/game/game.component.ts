import { Component } from '@angular/core';
import { CardModel, CardsModel } from '@app/models/card-model';
import { HttpPokemonCardsService } from '@app/services/http-pokemon-cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  public cards: CardModel[] = [];
  public doubleCards: CardModel[] = [];
  public filter = { pageSize: 5, page: Math.floor(Math.random() * 2728) };
  public loading: boolean = false;
  public firstCard?: CardModel;
  public firstCardIndex?: number;

  trackByIndex(index: number) {
    return index;
  }

  constructor(private httpPokemonCardsService: HttpPokemonCardsService) {}

  public getCards() {
    this.loading = true;
    this.httpPokemonCardsService
      .getCards(this.filter)
      .subscribe((response: CardsModel) => {
        this.cards = response.cards;
        this.doubleCards = [...this.cards, ...this.cards]
          .map((card) => ({ ...card }))
          .sort(() => Math.random() - 0.5);
        this.loading = false;
      });
  }

  flipCard(card: CardModel, index: number) {
    card.toogleFlip = true;
    if (this.firstCard === undefined) {
      this.firstCard = card;
      this.firstCardIndex = index;
      return;
    }
    if (this.firstCard.id === card.id && this.firstCardIndex !== index) {
      setTimeout(() => {
        if (this.firstCard !== undefined) {
          this.firstCard.hiddenCard = true;
          this.firstCard = undefined;
        }
        card.hiddenCard = true;
      }, 2000);
      return;
    }
    if (this.firstCard.id !== card.id) {
      setTimeout(() => {
        if (this.firstCard !== undefined) {
          this.firstCard.toogleFlip = false;
          this.firstCard = undefined;
        }
        card.toogleFlip = false;
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.getCards();
  }
}
