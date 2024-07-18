import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component representing a movie detail dialog.
 */
@Component({
  selector: 'app-movie-detail-dialog',
  templateUrl: './movie-detail-dialog.component.html',
  styleUrls: ['./movie-detail-dialog.component.scss'] // Note the correct property name is 'styleUrls'
})
export class MovieDetailDialogComponent {
  /**
   * Creates an instance of MovieDetailDialogComponent.
   * @param data - The data passed to the dialog containing the title and content.
   * @param dialogRef - A reference to the dialog opened.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    },
    public dialogRef: MatDialogRef<MovieDetailDialogComponent>
  ) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {}

  /**
   * Closes the dialog.
   */
  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
