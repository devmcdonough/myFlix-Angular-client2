import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; 
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'] // Note the correct property name is 'styleUrls'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  // Calls function once component is mounted
  ngOnInit(): void {
    this.getMovies();
  }

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

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

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

  showGenre(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.genre.name,
        content: movie.genre.description
      },
      width: "480px"
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: movie.director.name,
        content: movie.director.bio
      },
      width: "480px"
    });
  }

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
