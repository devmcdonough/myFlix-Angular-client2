import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail-dialog',
  templateUrl: './movie-detail-dialog.component.html',
  styleUrl: './movie-detail-dialog.component.scss'
})
export class MovieDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      content: string
    },
  public dialogRef: MatDialogRef<MovieDetailDialogComponent>
) { }

ngOnInIt(): void {}

closeMessageBox(): void {
  this.dialogRef.close();
}
}
