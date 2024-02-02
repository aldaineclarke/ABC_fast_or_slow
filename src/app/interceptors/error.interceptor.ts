import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  toastr = inject(ToastrService);
  loaderService = inject(LoadingService);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response:HttpErrorResponse)=>{
        this.loaderService.killLoader();

        let errorMessage = `Error: ${response.error.message}`;
        if(response.error.errors.length > 0 && typeof response.error.errors[0] == "string"){
          errorMessage = response.error.errors[0];
        }else if(response.error.errors.length > 0 && typeof response.error.errors[0] != "string"){
          errorMessage = response.error.errors[0].msg; // this is for forms that are validated on API side;
        }
        this.toastr.error(errorMessage);
        return throwError(()=>errorMessage);
      })
    );
  }
}
