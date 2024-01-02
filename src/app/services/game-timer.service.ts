import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameTimerService {

  constructor() { }

  private countdownTimer = new BehaviorSubject<string>("00:00");
  public countdown$ = this.countdownTimer.asObservable();
  public timer$ = new Observable<number>();

  parseStringCountdownToNum(countdown: string){ // accepts '00:40'
    return parseInt(countdown.split(":")[1]) // returns 40
  }
  displayTimer(timer:number){
    this.countdownTimer.next(this.parseNumToStopwatch(timer))
  }

  parseNumToStopwatch(numToParse: number){
    let minute = 0, second = 0;
    minute = Math.floor(numToParse / 60);
    second = numToParse % 60;
    let timeAsString = `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2,"0")}`;
    return timeAsString;
  }
}
