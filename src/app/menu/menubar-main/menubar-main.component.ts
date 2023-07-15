import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../login/authentication.service';
import { StatusManagementService } from '../../status-management.service';

@Component({
  selector: 'menubar-main',
  templateUrl: './menubar-main.component.html',
  styleUrls: ['./menubar-main.component.css']
})
export class MenubarMainComponent {
  // fullname: string = '';

  constructor(
    protected authenticationService: AuthenticationService,
    protected statusManagementService: StatusManagementService,
    private router: Router
  ) { }

  gotoLoginPage(): void {
    this.router.navigate(['/login']);
  }

  closeSession(): void {
    this.authenticationService.closeSession();
  }
}