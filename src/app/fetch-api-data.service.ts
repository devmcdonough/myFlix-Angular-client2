import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://mymovielibrary-905482f59fde.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class FetchApiDataService {
    constructor(private http: HttpClient) {}

    
    private getToken(): string {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).token : '';
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }

    public userRegistration(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + '/users', userDetails)
            .pipe(catchError(this.handleError));
    }

    public userLogin(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + '/login', userDetails)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + '/movies', {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public getMovieWithID(id: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `/movies/${id}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public getMovieWithTitle(title: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `/movies/title/${title}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public getDirector(directorName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `/directors/${directorName}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public getGenre(genre: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `/genres/${genre}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public getUser(id: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `/users/${id}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public editUser(userDetails: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + `/users/${userDetails.id}`, userDetails, {
          headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
          })
      }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
      );
  }
  

    public getFavoriteMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');
        return this.http.get(apiUrl + `/users/${userName}/movies`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public addFavoriteMovie(movieId: string): Observable<any> {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');
        return this.http.post(apiUrl + `/users/${userName}/movies/${movieId}`, {}, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    public deleteFavoriteMovie(movieId: string): Observable<any> {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');
        return this.http.delete(apiUrl + `/users/${userName}/movies/${movieId}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }
}
