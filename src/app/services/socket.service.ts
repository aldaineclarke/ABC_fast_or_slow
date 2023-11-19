import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './loading.service';
import { interval, take, tap, finalize } from 'rxjs';
import { Router } from '@angular/router';

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
  router = inject(Router);
  constructor(private socket: Socket) {
    this.registerListeners();
  }

  playersConnected:{username:string, email: string}[] = [];


  //listeners and events
  listenersAndEvents: Record<string, ListenerObject> = {
    join_room: {
      join_room_cb : (data)=>{
        console.log(data)
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
      }
    },
    countdown: {
      countdown_cb:(data)=>{
        let ct_val = 10;
        this.router.navigateByUrl("/game/main-page")
        this.loaderService.setMessage({main_message: `Game will begin in ${ct_val}`});

        interval(1000).pipe(
          take(9),
          tap((val)=>{
              this.loaderService.setMessage({main_message: `Game will begin in ${ct_val-val}`});
          }),
          finalize(()=>{
            this.loaderService.killLoader();
            this.emit("start_round",{room_id: "652ec8514bfcaa499d9f4b56", data: btoa(JSON.stringify({}))})

          })
        ).subscribe();
        this.loaderService.setMessage({main_message: data.main_message, side_messages: data.side_messages})
      }
    },
    waiting: {
      waiting_cb:(data)=>{
        console.log("Hey this is a test")
        this.loaderService.setMessage({main_message: data.main_message, side_messages: data.side_messages})
      }
    },
    start_round: {
      start_round_cb:(data)=>{
        console.log("round_start",data)
      }
    },
    stop_round:{
      stop_round_cb:(data)=>{
        this.loaderService.setMessage({main_message: "Dictator called stop round", })
      } 
    },
    letter_selected: {
      letter_selected_cb:(data)=>{
        console.log("Letter selected",data)
      }
    },
    player_connected: {
      player_connect_cb: (data)=>{
        this.playersConnected = data['players'];
      }
    },
    room_connect_error: {
      player_connect_cb: (data)=>{
        this.notif.error(data)
      }
    },
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
}
