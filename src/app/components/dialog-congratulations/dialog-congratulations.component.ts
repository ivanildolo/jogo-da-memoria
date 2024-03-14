import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-congratulations',
  templateUrl: './dialog-congratulations.component.html',
  styleUrl: './dialog-congratulations.component.scss'
})
export class DialogCongratulationsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCongratulationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}
