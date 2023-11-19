import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { APIResponse } from 'src/app/interfaces/api-response.interface';
import { IRoom } from 'src/app/interfaces/room.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SocketService } from 'src/app/services/socket.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthenticationService);
  apiService = inject(ApiHttpService);
  socketServer = inject(SocketService);
  apiUrl = environment.apiUrl;
  room_id = "";
  user !:IUser;
  roomData!:IRoom;
  playersConnected:{username:string, email: string}[] = [];


  ngOnInit(){
    this.route.paramMap.pipe(map((urlParams)=> urlParams.get("room_id"))).pipe(
      mergeMap((room_id)=>{
        if(!room_id){
          this.router.navigate(['/profile'])
        }
        return this.getRoomData(room_id!)
      })
    ).subscribe({
      next:(room)=>{
        console.log(room)
          this.room_id = room._id;
          this.roomData = room;
          if(!this.authService.currentUser){
            this.router.navigate(['/auth/login'])
          }
          this.user = this.authService.currentUser!;
          let dataObj = {
            token: this.authService.JWT,
            email:this.user.email, 
            username:this.user.username, 
            id: this.user._id, 
          }
          this.socketServer.emit('join_room',{room_id:this.room_id, data: btoa(JSON.stringify(dataObj)) });
      }
    });

    
  }
  getRoomData(room_id:string){
    return this.apiService.get(`${this.apiUrl}rooms/${room_id}`).pipe(map((res:APIResponse<{room:IRoom}>)=>res.data.room));
  }

  totalInRoom = 6;
    // users = [
    //   {
    //     username: "David",
    //     status: "Connected",
    //     img: "assets/img/ani-profile/penguin.png"
    //   },
    //   {
    //     username: "Johnny76",
    //     status: "Connected",
    //     img: "assets/img/ani-profile/penguin.png"
    //   },
    //   {
    //     username: "Wario_must_win",
    //     status: "Connecting",
    //     img: "assets/img/ani-profile/penguin.png"
    //   },
    //   {
    //     username: "Marcus",
    //     status: "Disconnected",
    //     img: "assets/img/ani-profile/penguin.png"
    //   },
    // ]

  startGame(){
    this.user = this.authService.currentUser!;
    let dataObj = {
      token: this.authService.JWT,
      email:this.user.email, 
      username:this.user.username, 
      id: this.user._id, 
    }
    this.socketServer.emit("start_game", {room_id: this.room_id, data: btoa(JSON.stringify(dataObj))});
    this.socketServer.on("choose_letter", ()=>{
      this.router.navigate(["/game/main-page"],{state: {showChooseLetterModal: true}});
    }, "choose_letter_cb")
  }
}
