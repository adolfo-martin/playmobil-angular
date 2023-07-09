import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationService } from './login/authentication.service';

type TUser = {
  username: string,
  firstname: string,
  lastname: string,
  accessToken: string,
  refreshToken: string
}

@Injectable({
  providedIn: 'root'
})
export class StatusManagementService {
  private loggedUserSubject: Subject<any> = new BehaviorSubject(null);
  loggedUser$: Observable<TUser>;

  private user: TUser = {} as TUser;

  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.loggedUser$ = this.loggedUserSubject.asObservable();
    this.authenticationService.user$.subscribe(user => {
      console.log(user?.accessToken);
      this.loggedUserSubject.next(user);
    })
  }

  // public setLoggedUser(user: TUser) {
  //   this.user = user;
  //   this.loggedUserSubject.next(user)
  // }
}