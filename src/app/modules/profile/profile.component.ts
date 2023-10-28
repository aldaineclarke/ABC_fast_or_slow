import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, mergeMap } from 'rxjs';
import { APIResponse } from 'src/app/interfaces/api-response.interface';
import { IRoom } from 'src/app/interfaces/room.interface';
import { IUser } from 'src/app/interfaces/user.interface';
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
  public rooms$!:Observable<Array<RoomCard>>;
  public profileData$!:Observable<ProfileData>;
  public user$!:Observable<IUser>;

  ngOnInit(){
    this.profileData$ = this.apiService.get(this.apiUrl+"userprofile").pipe(map((res:APIResponse<ProfileData>)=> res.data));
  }

  getUserProfileData(){
    this.apiService.get(this.apiUrl+"userprofile").subscribe({
      next:(res: APIResponse<ProfileData>)=>{
        console.log(res);
        // this.rooms = this.parseRoomFromResponse(res.data);
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

  parseRoomFromResponse(data:ProfileData):Array<RoomCard>{
    let rooms = data.rooms.map((room)=>{
      let status = data.statusOptions[(room.status as number)];
      return {room_id: room._id ,room_name: room.name, room_status: status, player_limit:room.player_limit}
    })

    return rooms;
  }

  

}

export type RoomCard = {
  room_id: string,
  room_name: string,
  room_status: string,
  player_limit: number,
}

export type ProfileData = {
  user: IUser,
  rooms: IRoom[],
  statusOptions:{[x:number]:string},
  privacyOptions:{[x:number]:string}

}
