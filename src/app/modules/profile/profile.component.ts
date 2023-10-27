import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private apiService = inject(ApiHttpService);
  private apiUrl = environment.apiUrl;
  private notif = inject(ToastrService);
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  public rooms:Array<RoomCard> = [];

  ngOnInit(){
    this.getUserProfileData();
  }

  getUserProfileData(){
    this.apiService.get(this.apiUrl+"userprofile").subscribe({
      next:(res: {[x:string]: any})=>{
        console.log(res);
        this.rooms = this.parseRoomFromResponse(res['data']);
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

  parseRoomFromResponse(data:{rooms:[], statusOptions:{[x:number]: string}}):Array<RoomCard>{
    let rooms = data.rooms.map((room)=>{
      let status = data['statusOptions'][(room['status'] as number)];
      return {room_id: room['id'] as string,room_name: room['name'] as string, room_status: status, player_limit:room['player_limit'] as number}
    })

    return rooms;
  }

  

}

export type RoomCard = {
  room_id: string;
  room_name: string;
  room_status: string;
  player_limit: number;
}
