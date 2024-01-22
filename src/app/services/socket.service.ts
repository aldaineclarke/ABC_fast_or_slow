import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { LoadingService, messageObject } from './loading.service';
import { interval, take, tap, finalize} from 'rxjs';
import { Router } from '@angular/router';
import { RoomService } from './room.service';
import { GameTimerService } from './game-timer.service';
import { IRoom } from '../interfaces/room.interface';
import { VotingComponent } from '../modules/game/voting/voting.component';
import { AuthenticationService } from './authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LetterGeneratorComponent } from '../modules/game/components/letter-generator/letter-generator.component';
interface ListenerCallback {
  (data: any): void;
}

interface ListenerObject {
  [key: string]: ListenerCallback;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  notif = inject(ToastrService);
  loaderService = inject(LoadingService);
  roomService = inject(RoomService);
  gameTimerService = inject(GameTimerService);
  authService = inject(AuthenticationService);
  router = inject(Router);
  letterModalRef!: MatDialogRef<LetterGeneratorComponent>;
  dialog = inject(MatDialog);
  constructor(private socket: Socket) {
    this.registerListeners();
  }

  playersConnected:{username:string, email: string}[] = [];
  //listeners and events
  listenersAndEvents: Record<string, ListenerObject> = {
    join_room: {
      join_room_cb : (data)=>{

        console.log(data)
        this.roomService.setRoomData(data) // set room data once user joins the room.
      }
    },
    start_game: {
      start_game_cb: (data)=>{
        console.log(data)
      }
    },
    choose_letter: {
      choose_letter_cb:()=>{
        console.log("I should be called");
        this.letterModalRef = this.dialog.open(LetterGeneratorComponent,{disableClose:true});
        this.letterModalRef.afterClosed().subscribe({
          next:(data:{selectedLetter: string, leaveRoom:boolean})=>{
            if(data.leaveRoom){
              this.leaveRoom();
            }else{
              this.emit("letter_selected",{room_id: this.roomService.room_id, data: btoa(JSON.stringify({selected_letter: data.selectedLetter, }))})
            }
          }
        })      
      }
    },
    countdown: {
      countdown_cb:(data)=>{
        let ct_val = 10;
        this.router.navigateByUrl("/game/main-page")
        this.loaderService.setMessage({main_message: `Game will begin in ${ct_val}`});
        interval(1000).pipe(
          take(10),
          tap((val)=>{
              this.loaderService.setMessage({main_message: `Game will begin in ${ct_val- ( val + 1 )}`}); // interval begins at 0 so I will use this expression to start subtracting from 1
          }),
          finalize(()=>{
            this.loaderService.killLoader();
            this.emit("start_round",{room_id: this.roomService.room_id, data: btoa(JSON.stringify({}))});
            this.roomService.roundLetter = data.selected_letter;

            // this.roomService.room_data$.subscribe({
            //   next: (room)=>{
            //       this.gameTimerService.setTimer( room?.round_duration);
            //       this.gameTimerService.startTimer();
            //   }
            // })

          })
        ).subscribe();
        // this.loaderService.setMessage({main_message: data.main_message, side_messages: data.side_messages})
      }
    },
    timer:{
      timer_cb: ({time_remaining})=>{
          this.gameTimerService.displayTimer(time_remaining);
          console.log(time_remaining);
      }
    },
    time_up:{
      time_up_cb: (data: {next_event: string, message:{main_message: string, side_messages: string[]}})=>{
        this.loaderService.setMessage({main_message: data.message.main_message, side_messages: data.message.side_messages});
        this.submitVotes();
      }
    },
    waiting: {
      waiting_cb:(data)=>{
        this.loaderService.setMessage({main_message: data.main_message, side_messages: data.side_messages});

      }
    },
    start_round: {
      start_round_cb:(data)=>{

        console.log("round_start",data)
      }
    },
    stop_round:{
      stop_round_cb:(data:messageObject)=>{
        console.log("Called in stop round")
        this.loaderService.setMessage(data);
        this.roomService.gameFieldForm.disable();
        let formFields : {[x:string]: string} = {};
        //remove the *field-* prefix from the gamefields object key;
        for(let [key, value] of Object.entries(this.roomService.gameFieldForm.value)){
          key = key.slice(6);
          formFields[key] = value as string;
        }
        this.emit("round_response", {room_id: this.roomService.room_id, data:btoa(JSON.stringify({player:this.authService.currentUser?._id, response:formFields}))})
        // emit event which sends all fields and data back to the api to share.
      } 
    },
    letter_selected: {
      letter_selected_cb:(data)=>{
        console.log(data)
        this.roomService.roundLetter = data.selected_letter;
      }
    },
    player_connected: {
      player_connect_cb: (data)=>{
        console.log(data)
        this.playersConnected = data['players'];
      }
    },
    room_connect_error: {
      player_connect_cb: (data)=>{
        this.notif.error(data)
      }
    },
    round_response:{
      
    },
    round_responses: {
      round_response_cb: (data)=>{
        this.roomService.responses = (data as {responses:[]}).responses.filter((response)=> response['player'] != this.authService.currentUser?.username).map((userResponse:{player:string, response:{[x:string]: any}})=>{
            for(let key in userResponse.response){
              userResponse.response[key] = {value: userResponse.response[key], isCorrect: false}
            }
            return userResponse;
        });
        console.log("Round Responses: ", this.roomService.responses)
        this.router.navigate(["/voting-screen"]);
        this.loaderService.killLoader();
        
      }
    },
    round_tally:{
      round_tally_cb: (data)=>{
        // this.loaderService.killLoader();
        console.log("Round Tally: ",data);
        this.loaderService.killLoader();
        this.roomService.roundTally = data["response"];
        this.router.navigate(["/game/show-tally"]);
      }
    },
    submit_votes:{
      submit_votes_cb:()=>{
        console.log("submit Votes Listener");
      }
    },
    submit_vote:{}

  };

  // Listener registration
  registerListeners(): void {
    Object.keys(this.listenersAndEvents).forEach((key) => {
      this.socket.on(key, (object: object) => {
        console.log('LISTENER AUTOMIZER', key);
        Object.values(this.listenersAndEvents[key]).forEach((cb) => {
          cb(object);

        });
      });
    });
  }

  //on specific listener
  on(event: string, cb: ListenerCallback, key: string): void {
    this.listenersAndEvents[event]
      ? (this.listenersAndEvents[event][key] = cb)
      : console.error(`${event} is not a registered listener`);
    console.log('liteners', this.listenersAndEvents);
  }

  // Emit an event
  emit(event: string, object: object): void {
    this.checkEmitter(event, object);
  }

  checkEmitter(event: string, object: object) {
    this.listenersAndEvents.hasOwnProperty(event)
      ? this.socket.emit(event, object)
      : console.error(`${event} is not a registered event`);
  }


  stopRound(){
    this.emit("stop_round", {room_id: this.roomService.room_id, data: btoa(JSON.stringify({id: this.authService.currentUser?._id}))})
  }
  submitVotes(){
    let data = {room_id:this.roomService.room_id,  data: btoa(JSON.stringify({socket_user_id: this.authService.currentUser?._id , vote: this.roomService.responses}))};
    this.emit("submit_vote", data);
  }
  leaveRoom(){
    this.router.navigate(["/profile"]);
  }

}
