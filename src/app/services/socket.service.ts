import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

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
  constructor(private socket: Socket) {
    this.registerListeners();
    console.log(this.listenersAndEvents);
  }

  //listeners and events
  listenersAndEvents: Record<string, ListenerObject> = {
    round_start: {},
    stopRound: {},
    player_connect: {},
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
