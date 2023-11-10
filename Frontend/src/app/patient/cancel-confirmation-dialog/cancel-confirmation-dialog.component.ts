// cancel-confirmation-dialog.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-confirmation-dialog',
  templateUrl: './cancel-confirmation-dialog.component.html',
  styleUrls: ['./cancel-confirmation-dialog.component.css']
})
export class CancelConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<CancelConfirmationDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Emit true when confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Emit false when canceled
  }
}
