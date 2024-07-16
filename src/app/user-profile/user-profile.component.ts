import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userdata: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {
    this.userdata = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
    this.getUser();
  }

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

  resetUser(): void {
    this.userdata = JSON.parse(localStorage.getItem("user") || "{}");
  }

  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

  getFavoriteMovie(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favoriteMovies = res.filter((movie: any) => {
        return this.userdata.favoriteMovies.includes(movie._id);
      });
    }, (err: any) => {
      console.error(err);
    });
  }

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

  removeFromFavorites(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe((res: any) => {
      this.userdata.favoriteMovies = res.favoriteMovies;
      this.favoriteMovies = res.favoriteMovies;
      this.getFavoriteMovie();
    }, (err: any) => {
      console.error(err);
    });
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}
