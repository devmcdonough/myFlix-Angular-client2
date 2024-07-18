import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; 
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';

/**
 * Component representing a movie card view.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'] // Note the correct property name is 'styleUrls'
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to hold movie data.
   */
  movies: any[] = [];

  /**
   * Constructor to inject services.
   * @param fetchMovies - The FetchApiDataService to fetch movie data.
   * @param router - The Router service for navigation.
   * @param dialog - The MatDialog service to open dialog components.
   */
  constructor(
    public fetchMovies: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Calls getMovies() method to fetch movies data.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches movies data from the API and sets it to the movies array.
   * Also checks if movies are in the user's favorites list.
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      let user = JSON.parse(localStorage.getItem("user") || "{}");
      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.favoriteMovies.includes(movie._id);
      });
      console.log(this.movies);
      return this.movies;
    }, err => {
      console.error(err);
    });
  }

  /**
   * Logs the user out by navigating to the welcome page and removing the user data from localStorage.
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  /**
   * Adds or removes a movie from the user's favorite movies list.
   * @param movie - The movie to add or remove from favorites.
   */
  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.favoriteMovies.includes(movie._id)) {
      this.fetchMovies.deleteFavoriteMovie(movie._id).subscribe(res => {
        icon?.setAttribute("fontIcon", "inactive-icon");

        user.favoriteMovies = res.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
      }, err => {
        console.error(err);
      });
    } else {
      this.fetchMovies.addFavoriteMovie(movie._id).subscribe(res => {
        icon?.setAttribute("fonticon", "active-icon");

        user.favoriteMovies = res.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
      }, err => {
        console.error(err);
      });
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Opens a dialog to show the genre details of a movie.
   * @param movie - The movie whose genre details are to be shown.
   */
  showGenre(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.genre.name,
        content: movie.genre.description
      },
      width: "480px"
    });
  }

  /**
   * Opens a dialog to show the director details of a movie.
   * @param movie - The movie whose director details are to be shown.
   */
  showDirector(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.director.name,
        content: movie.director.bio
      },
      width: "480px"
    });
  }

  /**
   * Opens a dialog to show the details of a movie.
   * @param movie - The movie whose details are to be shown.
   */
  showDetail(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.title,
        content: movie.description
      },
      width: "480px"
    });
  }
}
