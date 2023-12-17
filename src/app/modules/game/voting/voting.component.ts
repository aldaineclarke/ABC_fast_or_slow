import { Component, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RoomService } from 'src/app/services/room.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
  providers:[
    GameTimerService,
  ]
})
export class VotingComponent {
  gameTimerService = inject(GameTimerService);
  authService = inject(AuthenticationService);
  roomService = inject(RoomService);
  socketService = inject(SocketService);
  loaderService = inject(LoadingService);
  gameFields:string[] = [];
  ngOnInit(){
    this.gameTimerService.setTimer();
    this.gameTimerService.startTimer();
    this.gameTimerService.countdown$.subscribe({
      next: (count)=>{
        if(this.gameTimerService.parseStringCountdownToNum(count) < 1 ){
          this.loaderService.setMessage({main_message:"Time is up", side_messages:["Submitting Votes"]});
          this.submitVotes();
        }
      }
    })  
  }
  field_index=  0;
  gotoNextField(fieldCount:number){
    if(this.field_index < fieldCount){
      this.field_index++;
    }
    else{
      this.submitVotes();
    }
  }

  toggleResponse(player_name:string, field:string){
      this.roomService.responses.forEach((response)=>{
        if(response.player == player_name){
          response.response[field].isCorrect = !response.response[field].isCorrect; 
        }
      })
  }

  submitVotes(){
    let data = {room_id:this.roomService.room_id,  data: btoa(JSON.stringify({socket_user: this.authService.currentUser?._id , vote: this.roomService.responses}))};
    this.socketService.emit("submit_vote", data);
    this.gameTimerService.stopTimer();
  }
}
