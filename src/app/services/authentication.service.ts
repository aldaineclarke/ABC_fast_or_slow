import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  private static readonly TOKEN_KEY = "TOKEN";

  public get JWT(){     
    let token =  sessionStorage.getItem(AuthenticationService.TOKEN_KEY) ?? "";
    return token;
  }
  public set JWT(newToken:string){
    sessionStorage.setItem(AuthenticationService.TOKEN_KEY, newToken);
  }

  public isLoggedIn():boolean{
    return !!this.JWT // The operator !! converts a truthy or falsy expression to true or false.
  }

  
}
