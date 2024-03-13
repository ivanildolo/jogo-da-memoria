import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() imageUrl!: string;
  @Input() isFlipped: boolean = true;

  ngOnInit(): void {
    if (this.isFlipped === undefined) {
      setTimeout(() => {
        this.isFlipped = false;
      }, 3000);
    }
  }
}
