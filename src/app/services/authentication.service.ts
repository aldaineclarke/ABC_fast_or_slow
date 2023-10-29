import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { EncDecService } from './enc-dec.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  encDec = inject(EncDecService); 
  router = inject(Router); 
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
    let encyptedUserData = this.encDec.encryptAndEncode(user);
    if(!encyptedUserData){
     this.router.navigate(['/auth/login'])
    }else{
      sessionStorage.setItem("USER", encyptedUserData)
    }
  }
  public get currentUser(){
    let encodedUser =  sessionStorage.getItem(AuthenticationService.USER) ?? "";
    if(encodedUser){
      let plaintext = this.encDec.decodeAndDecrypt(encodedUser);
      if(plaintext){
        let user = JSON.parse(plaintext) as IUser;
        return user;  
      }
    }
    
    return undefined;
  
  }

  public isLoggedIn():boolean{
    return !!this.JWT // The operator !! converts a truthy or falsy expression to true or false.
  }

  
}
