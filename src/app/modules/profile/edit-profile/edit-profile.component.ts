import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { APIResponse } from 'src/app/interfaces/api-response.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  router = inject(Router);
  authService = inject(AuthenticationService);
  apiService = inject(ApiHttpService);
  private apiUrl = environment.apiUrl;
  private notif = inject(ToastrService);
  user!:IUser;

  ngOnInit(){
    if(!this.authService.currentUser){
      this.router.navigate(['/auth/login']);
    }else{
      let user = this.user = this.authService.currentUser;
      this.profileUpdateForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
        username:user.username
      })
    }

  }

  profileUpdateForm = new FormGroup({

    "firstName": new FormControl("", [Validators.required]),
    "lastName": new FormControl("", [Validators.required]),
    "username": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.required]),
  });

  updateProfile(){
    this.apiService.patch(`${this.apiUrl}users/${this.user._id}`, this.profileUpdateForm.value).subscribe({
      next:(res)=>{
          let response = res as APIResponse<UserData>
          this.authService.saveuser(response.data.user)
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
}

type UserData = {
  user: IUser;
}
