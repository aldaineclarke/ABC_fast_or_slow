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


  setRoomData(room_data: IRoom){
    this.room_data.next(room_data);
    this.room_id = room_data._id;
  }
  
}
