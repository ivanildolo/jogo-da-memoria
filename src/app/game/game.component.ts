import { Component } from '@angular/core';
import { CardModel, CardsModel } from '@app/models/card-model';
import { HttpPokemonCardsService } from '@app/game/http-services/http-pokemon-cards.service';
import { MemoryGameValidatorService } from './util-services/memory-game-validator-service';
import { BehaviorSubject, filter, map, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogCongratulationsComponent } from '@app/components/dialog-congratulations/dialog-congratulations.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  doubleCards: CardModel[] = [];
  loading: boolean = false;
  firstCard?: CardModel;
  secondCard?: CardModel;
  firstCardIndex?: number;

  cartasSubject$: BehaviorSubject<CardModel[]> = new BehaviorSubject<CardModel[]>([]);


  constructor(
    private httpPokemonCards: HttpPokemonCardsService,
    private memoryGameValidator: MemoryGameValidatorService,
    public dialog: MatDialog
    ) {}
    
 
  public getCards() {
    this.loading = true;
    const filter = { pageSize: 5, page: Math.floor(Math.random() * 2728) };
    this.httpPokemonCards
      .getCards(filter)
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
        this.cartasSubject$.next(this.doubleCards);
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogCongratulationsComponent, {
      data: {animal: 'panda', name: 'Urso'},
      width: '450px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCards();
    });
  }
  

  ngOnInit(): void {
    this.getCards();
    this.cartasSubject$.pipe(
      filter(cards => cards.length > 0),
      map(cards =>{ 
        return cards.every(cards => cards.hiddenCard === true)
      })
      ).subscribe(allCardsIsHidden => {
      if (allCardsIsHidden) {
        this.openDialog();
      }
    });
  }
}
