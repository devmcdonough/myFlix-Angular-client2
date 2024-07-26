import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.FavoriteMovies) {
        user.FavoriteMovies = [];
      }

      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.FavoriteMovies.includes(movie._id);
      });

      return this.movies;
    }, (err: any) => {
      console.error(err);
    });
  }

  logout(): void {
    localStorage.removeItem("user");
    this.router.navigate(["welcome"]);
  }

  redirectProfile(): void {
    this.router.navigate(["profile"]);
  }

  modifyFavoriteMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }

    console.log('User before modification:', user);

    const icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.FavoriteMovies.includes(movie._id)) {
      console.log('Removing movie from favorites:', movie._id);
      this.fetchMovies.deleteFavoriteMovie(movie._id, user.Username).subscribe((res: any) => {
        console.log('Response from deleteFavoriteMovie:', res);
        if (res && res.FavoriteMovies) {
          icon?.setAttribute("fontIcon", "favorite_border");
          user.FavoriteMovies = res.FavoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
          console.log('User after removal:', user);
        } else {
          console.error('Failed to remove favorite movie.');
        }
      }, (err: any) => {
        console.error('Error removing favorite movie:', err);
      });
    } else {
      console.log('Adding movie to favorites:', movie._id);
      this.fetchMovies.addFavoriteMovie(movie._id, user.Username).subscribe((res: any) => {
        console.log('Response from addFavoriteMovie:', res);
        if (res && res.FavoriteMovies) {
          icon?.setAttribute("fontIcon", "favorite");
          user.FavoriteMovies = res.FavoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
          console.log('User after addition:', user);
        } else {
          console.error('Failed to add favorite movie.');
        }
      }, (err: any) => {
        console.error('Error adding favorite movie:', err);
      });
    }
  }

  showGenre(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: String(movie.Genre.Name).toUpperCase(),
        content: movie.Genre.Description
      },
      width: "400px"
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.Director.Name,
        content: movie.Director.Bio
      },
      width: "400px"
    });
  }

  showDetail(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: "400px"
    });
  }
}
