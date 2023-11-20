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
  public timerSub!:Subscription;
  startTimer(){
    this.timerSub = this.timer$.subscribe();
  }
  stopTimer(){
    this.timerSub.unsubscribe();
  }

  setTimer(timerStart = 30){
    this.countdownTimer.next(this.parseNumToStopwatch(timerStart))
    this.timer$ = interval(1000).pipe(
      take(timerStart + 1),
      tap((counter)=>{
        this.countdownTimer.next(this.parseNumToStopwatch(timerStart - counter))
      })
    )
  }

  parseNumToStopwatch(numToParse: number){
    let minute = 0, second = 0;
    minute = Math.floor(numToParse / 60);
    second = numToParse % 60;
    let timeAsString = `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2,"0")}`;
    return timeAsString;
  }
}
