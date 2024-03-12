import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { CardComponent } from '../components/card/card.component';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    GameComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule
  ]
})
export class GameModule { }
