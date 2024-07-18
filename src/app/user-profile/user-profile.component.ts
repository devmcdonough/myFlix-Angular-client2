import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component representing the user profile view.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * Object to hold user data.
   */
  userdata: any = {};

  /**
   * Array to hold the user's favorite movies.
   */
  favoriteMovies: any[] = [];

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData - The service to fetch API data.
   * @param router - The router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {
    this.userdata = JSON.parse(localStorage.getItem("user") || "{}");
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Calls getUser() method to fetch user data.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Updates user data by calling the editUser method of FetchApiDataService.
   * Updates local storage with the new user data.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userdata).subscribe((res: any) => {
      this.userdata = {
        ...res,
        id: res._id,
        password: this.userdata.password,
        token: this.userdata.token
      };
      localStorage.setItem("user", JSON.stringify(this.userdata));
      this.getFavoriteMovie();
    }, (err: any) => {
      console.error(err);
    });
  }

  /**
   * Resets user data to the data stored in local storage.
   */
  resetUser(): void {
    this.userdata = JSON.parse(localStorage.getItem("user") || "{}");
  }

  /**
   * Navigates back to the movies view.
   */
  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * Fetches and filters the user's favorite movies from the API.
   */
  getFavoriteMovie(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favoriteMovies = res.filter((movie: any) => {
        return this.userdata.favoriteMovies.includes(movie._id);
      });
    }, (err: any) => {
      console.error(err);
    });
  }

  /**
   * Fetches user data from the API and updates local storage.
   * Calls getFavoriteMovie() method to fetch favorite movies.
   */
  getUser(): void {
    this.fetchApiData.getUser(this.userdata.id).subscribe((res: any) => {
      this.userdata = {
        ...res, 
        id: res._id,
        password: this.userdata.password,
        token: this.userdata.token
      };
      localStorage.setItem("user", JSON.stringify(this.userdata));
      this.getFavoriteMovie();
    }, (err: any) => {
      console.error(err);
    });
  }

  /**
   * Removes a movie from the user's favorite movies list.
   * @param movie - The movie to be removed from favorites.
   */
  removeFromFavorites(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe((res: any) => {
      this.userdata.favoriteMovies = res.favoriteMovies;
      this.favoriteMovies = res.favoriteMovies;
      this.getFavoriteMovie();
    }, (err: any) => {
      console.error(err);
    });
  }

  /**
   * Logs out the user by navigating to the welcome page and removing the user data from local storage.
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}
