import { Component, OnInit, Input } from '@angular/core';

// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Displays notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Object to hold user registration data.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - The service to fetch API data.
   * @param dialogRef - A reference to the dialog opened.
   * @param snackBar - The service to show snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void { }

  /**
   * Sends the form inputs to the backend to register the user.
   * Closes the dialog on success and shows a snack bar notification.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful registration goes here
      console.log(result);
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('User registration failed', 'OK', {
        duration: 2000
      });
    });
  }
}
