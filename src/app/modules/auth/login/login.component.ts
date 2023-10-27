import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private apiService = inject(ApiHttpService);
  private apiUrl = environment.apiUrl;
  notif = inject(ToastrService);
  private authService = inject(AuthenticationService);
  private router = inject(Router);


  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });



  loginHandler(){
    if(this.loginForm.invalid){
      console.log("Form data is incomplete")
    }else{
      this.apiService.post(this.apiUrl+"auth/login", this.loginForm.value).subscribe({
        next:(res:{[x:string]:any})=>{
          console.log(res)
          this.authService.JWT = res['data']['token'];
          this.router.navigate(['/profile']);

        },
        error:(res:HttpErrorResponse)=>{
          let errorObj: {message:string, errors:any[], data:[]} = res.error;
          if(errorObj.errors.length >= 1){
            if( typeof errorObj.errors[0] == 'string'){
              this.notif.error(errorObj.errors[0]);
            }else{
              console.log(errorObj.errors[0].msg)
              this.notif.error(errorObj.errors[0].msg)
            }
          }
        }
      })
    }
    console.log("submitted")
  }
}
