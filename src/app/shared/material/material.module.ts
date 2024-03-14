import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatSnackBarModule,
  MatDialogModule
];
@NgModule({
  declarations: [],
  imports: materialModules,
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'center',
      },
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  exports: materialModules,
})
export class MaterialModule {}
