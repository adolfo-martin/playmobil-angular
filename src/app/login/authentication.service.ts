// https://jasonwatmore.com/post/2020/09/21/angular-10-facebook-login-tutorial-example#account-service-ts

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, Subject, tap, throwError } from 'rxjs';

export type TUser = {
  username: string,
  firstname: string,
  lastname: string,
  accessToken: string,
  refreshToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationSubject: Subject<TUser | null>;
  public user$: Observable<TUser | null>;


  constructor(private http: HttpClient) {
    // @ts-ignore
    this.authenticationSubject = new Subject<TUser | null>();
    this.user$ = this.authenticationSubject.asObservable();
  }


  public validateUserCredentials$(username: string, password: string): Observable<TUser> {
    const url = 'http://127.0.0.1:8081/api/login_user ';
    const body = { username, password };
    
    return this.http.post<{ accessToken: string, refreshToken: string }>(url, body).pipe(
      map(({ accessToken, refreshToken }) => ({ 
        accessToken, 
        refreshToken, 
        ...this.decodeJwtToken(accessToken)
      })),
      retry(1),
      tap(user => this.authenticationSubject.next(user)),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.status === 0) {
      const myError = {...error}
      myError.statusText = 'Client-side or network error';
      myError.status = 0;
      return throwError(() => myError);
    } else {
      return throwError(() => error);
    }
  }


  public closeSession() {
    this.authenticationSubject.next(null);
  }


  private decodeJwtToken(token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
