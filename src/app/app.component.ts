import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
    // This function will open the dialog when the signup button is clicked
    openUserRegistration(): void {
      this.dialog.open(UserRegistrationFormComponent, {
      //Assign the dialog a width will add more styling later
      width: '480px'
    });
  }
}
