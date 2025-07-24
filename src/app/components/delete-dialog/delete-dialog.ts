import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sports } from '../sports/sports';

@Component({
  selector: 'delete-dialog',
  standalone: false,
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  dialogRef = inject(MatDialogRef<Sports>);
  handleDelete() {
    this.dialogRef.close();
  }
}
