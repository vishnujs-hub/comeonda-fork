import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sports } from '../sports/sports';

@Component({
  selector: 'delete-dialog',
  standalone: false,
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  dialogRef = inject(MatDialogRef<Sports>);
  data = inject(MAT_DIALOG_DATA);
  handleDelete() {
    this.dialogRef.close('confirmed');
  }
}
