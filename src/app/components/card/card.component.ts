import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() imageUrl!: string; // URL da imagem da carta
  isFlipped: boolean = false; // Estado da carta (virada ou não)

  flipCard() {
    this.isFlipped = !this.isFlipped; // Inverte o estado da carta
  }
}
