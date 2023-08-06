import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  
  private loadSubject = new BehaviorSubject<messageObject>({main_message: "Waiting for Players"});
  private loadState = new BehaviorSubject<boolean>(false);
  private showMessage$ = this.loadSubject.asObservable();
  private loadState$ = this.loadState.asObservable();

  

  setMessage(message:messageObject){
    this.loadSubject.next(message);
    this.loadState.next(true);
  }

  get getMessage(){
    return this.showMessage$;
  }
  get showLoader(){
    return this.loadState$;
  }
  killLoader(){
    this.loadState.next(false);
  }

}

export interface messageObject{
  main_message: string,
  side_messages?: string[]
}
