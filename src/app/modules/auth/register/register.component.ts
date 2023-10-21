import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { environment } from 'src/environments/environments';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  apiService = inject(ApiHttpService);
  notif = inject(ToastrService)
  apiUrl = environment.apiUrl;
  registrationForm = new FormGroup({
    "username": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required]),
    "confirmPassword": new FormControl("", [Validators.required]),
  });


  register(){
    if(this.registrationForm.valid){
      this.apiService.post(this.apiUrl+"auth/register", this.registrationForm.value).subscribe({
        next:(res)=>{
          console.log(res)
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
    }else{
      console.log("invalid");
    }
  }
}
