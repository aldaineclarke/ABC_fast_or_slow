import { Component, HostListener, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-game-fields',
  templateUrl: './game-fields.component.html',
  styleUrls: ['./game-fields.component.scss']
})
export class GameFieldsComponent {
  // Should listen for a particular key to easily stop round.
    @HostListener('keydown') keydownEvent (){
      
    }
    roomService = inject(RoomService);
    @Input('game-fields') fields : string[] =[];
    gameForm = new FormGroup({});
    ngOnInit(){
      this.roomService.gameFieldForm = this.gameForm;
      this.fields.forEach((field)=>{
        this.gameForm.addControl(`field-${field}`, new FormControl());
      });
      console.log(this.roomService.gameFieldForm)
    }

}
