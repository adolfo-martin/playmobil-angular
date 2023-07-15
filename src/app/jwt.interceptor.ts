import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusManagementService } from './status-management.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  static playmobilApiUrl = 'http://127.0.0.1:8082/';
  token?: string;

  constructor(private statusManagementService: StatusManagementService) {
    this.statusManagementService.loggedUser$.subscribe(user => this.token = user?.accessToken);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isPlaymobilUrl = request.url.startsWith(JwtInterceptor.playmobilApiUrl);

    if (isPlaymobilUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` }
      });
    }

    return next.handle(request);
  }
}