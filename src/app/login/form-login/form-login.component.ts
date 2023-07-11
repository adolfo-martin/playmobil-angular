import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

type TUser = {
  username: any,
  password: any,
}

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  user: TUser;
  formLogin: FormGroup<TUser>;
  isSubmitted = false;
  waiting = false;
  errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.user = {} as TUser;

    this.formLogin = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required
      ]),
      password: new FormControl(this.user.password, [
        Validators.required
      ]),
    });

    this.authenticationService.user$.subscribe(user => {
      this.waiting = false;
      this.router.navigate(['/initial']);
    });
  }

  get username() {
    // @ts-ignore
    return this.formLogin.get('username');
  }

  get password() {
    // @ts-ignore
    return this.formLogin.get('password');
  }

  validateUserCredentials() {
    this.isSubmitted = true;

    if (!this.formLogin.valid) {
      return false;
    }

    this.waiting = true;
    // @ts-ignore
    const { username, password } = this.formLogin.value;
    // @ts-ignore
    this.authenticationService.validateUserCredentials$(username, password).subscribe({
      error: error => {
        console.log(error)
        this.waiting = false;
        if (error.status === 401) {
          this.errorMessage = "El usuario o la contraseña es incorrecta.";
        } else {
          this.router.navigate(['/error/', error.statusText])
        }
      }
    });
    return true;
  }
}