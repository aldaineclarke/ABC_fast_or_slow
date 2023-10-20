import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{


  private authService:AuthenticationService = inject(AuthenticationService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Check if the user is already logged in
    // Check if the request is to the server that it is intended to.

    if(this.authService.isLoggedIn()){
      req = req.clone({
        setHeaders: {Authentication: `Bearer ${this.authService.JWT}`}
      });
    }

    return next.handle(req);
  }
}
