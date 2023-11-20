import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { IRoom } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  private room_data = new BehaviorSubject<IRoom | null>(null);
  public room_data$ = this.room_data.asObservable();
  public room_id = "";
  private _roundLetter = "";


  setRoomData(room_data: IRoom){
    console.log(room_data)
    this.room_data.next(room_data);
    this.room_id = room_data._id;
    console.log("Room ID", this.room_id)
  }

  set roundLetter(letter: string){
    this._roundLetter = letter.charAt(0); // If string passed in is longer than 1 character it just takes the first one.
  } 

  get roundLetter(){
    return this._roundLetter;
  }
  
}
