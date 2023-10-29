import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  private static readonly TOKEN_KEY = "TOKEN";
  private static readonly USER = "USER";

  public get JWT(){     
    let token =  sessionStorage.getItem(AuthenticationService.TOKEN_KEY) ?? "";
    return token;
  }
  public set JWT(newToken:string){
    sessionStorage.setItem(AuthenticationService.TOKEN_KEY, newToken);
  }

  public saveuser(user:IUser){
    sessionStorage.setItem("USER", btoa(JSON.stringify(user)) )
  }
  public get currentUser(){
    let encodedUser =  sessionStorage.getItem(AuthenticationService.USER) ?? "";
    if(encodedUser){
      let user = JSON.parse(atob(encodedUser)) as IUser;
      return user;
    }else{
      return undefined;
    }
  }

  public isLoggedIn():boolean{
    return !!this.JWT // The operator !! converts a truthy or falsy expression to true or false.
  }

  
}
