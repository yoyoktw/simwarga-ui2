import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const loginStatus = this.authService.getLoginStatus();

    if (loginStatus && loginStatus.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loginStatus.accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
