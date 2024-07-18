import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component representing the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Object to hold user login data.
   */
  @Input() userdata = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData - The service to fetch API data.
   * @param dialogRef - A reference to the dialog opened.
   * @param snackBar - The service to show snack bar notifications.
   * @param router - The router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void { }

  /**
   * Logs in the user by calling the userLogin method of FetchApiDataService.
   * Stores the user data and token in local storage upon successful login.
   * Shows a snack bar notification for success or failure.
   * Navigates to the movies route upon successful login.
   */
  logInUser(): void {
    this.fetchApiData.userLogin(this.userdata).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }
}
