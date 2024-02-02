import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, switchMap } from 'rxjs';
import { APIResponse } from 'src/app/interfaces/api-response.interface';
import { IRoom } from 'src/app/interfaces/room.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpEndpointsService } from 'src/app/services/http-endpoints.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {
  private apiService = inject(ApiHttpService);
  private httpEndpoints = inject(HttpEndpointsService);
  private notif = inject(ToastrService);
  public rooms$!:Observable<Array<RoomCard>>;
  public profileData$!:Observable<ProfileData>;
  public user$!:Observable<IUser>;
  public rooms: Array<RoomCard> = [];
  public userData!:any;
  public authService = inject(AuthenticationService);
  ngOnInit(){
    this.getUserProfileData();
  }

  getUserProfileData(){
    this.apiService.get(this.httpEndpoints.USERPROFILE).subscribe({
      next:(res: APIResponse<ProfileData>)=>{
        console.log(res);
        this.userData = res.data;
        this.rooms = this.parseRoomFromResponse(res.data);
      },
     
    })
  }

  updateRooms(){
    this.apiService.get(this.httpEndpoints.ROOMSENDPOINT,  {"user_id": this.authService.currentUser?._id!}).subscribe({
      next: (res)=>{
          this.rooms = this.parseRoomFromResponse(res.data);
      }
    })
  }

  parseRoomFromResponse(data:ProfileData):Array<RoomCard>{
    console.log(data.rooms)
    let rooms = data.rooms.map((room)=>{
      let status = data.statusOptions[(room.status as number)];
      return {room_id: room._id ,room_name: room.name, room_status: status, player_limit:room.player_limit}
    })

    return rooms;
  }

  deleteRoom(room_id:string){
    // remove the room from the room map then call the api to delete. if successful then all is well. else show error and add the room back to the map
  
    this.apiService.delete(this.httpEndpoints.ROOMSENDPOINT+room_id).subscribe({
      next:(response)=>{
          this.notif.success("successfully deleted room");
          this.updateRooms();
      },
    });

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