import { Component, OnInit, Input } from '@angular/core';

// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Displays notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Called when creating an instance of the class
  // @param fetchApiData
  // @param dialogRef
  // @param snackBar

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

    ngOnInit(): void {

    }

    // This is the function that sends the form inputs to the backend
    registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
        // Logic for a successful registration goes here
        console.log(result)
        this.dialogRef.close(); //This will close modal on success
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000
        });
      });
    }
}
