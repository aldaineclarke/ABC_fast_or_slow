import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptorService } from "./jwt-interceptor.service";
import { ErrorInterceptor } from "./error.interceptor";

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
];
