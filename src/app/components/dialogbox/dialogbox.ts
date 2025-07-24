import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sports } from '../sports/sports';

@Component({
  selector: 'dialogbox',
  standalone: false,
  templateUrl: './dialogbox.html',
  styleUrl: './dialogbox.scss',
})
export class Dialogbox {
  sports: string = '';
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<Sports>);
  constructor() {
    console.log('dialog', this.data);
    this.sports = this.data?.sports_name || '';
  }
  handleCreate() {
    this.dialogRef.close({
      name: this.sports,
      id: this.data?.id,
      edit: this.data?.id,
    });
  }
}
