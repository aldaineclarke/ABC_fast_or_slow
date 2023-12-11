import { Component, inject } from '@angular/core';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { RoomService } from 'src/app/services/room.service';

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
  roomService = inject(RoomService);
  gameFields:string[] = [];
  ngOnInit(){
    this.gameTimerService.setTimer();
    this.gameTimerService.startTimer();
    console.log(this.roomService.responses)

  }
  field_index=  0;
  gotoNextField(fieldCount:number){
    if(this.field_index < fieldCount){
      this.field_index++;
    }
    else{
      
    }
  }
  ProxyObject = Object;
  user_responses:{player_name:string, responses:{[x:string]: any}}[] = [
    {
      player_name: "Johnny",
      responses: {
          Boy:{value: "Peter", isCorrect:false},
          Girl: {value: "Paula", isCorrect:false},
          Celebrity: {value: "Polo G", isCorrect:false},
          Animal: {value: "Panther", isCorrect:false},
          Place: {value: "Peteresburg", isCorrect:false},
          Food: {value: "Porridge", isCorrect:false},
          Thing: {value: "Pot", isCorrect:false},
        }
    },
    {
      player_name: "WizKid",
      responses:{
          Boy: {value: "Pink", isCorrect:false},
          Girl: {value: "Philisha", isCorrect:false},
          Celebrity: {value: "Porridge", isCorrect:false},
          Animal: {value: "Porridge", isCorrect:false},
          Place: {value: "Porridge", isCorrect:false},
          Food: {value: "Porridge", isCorrect:false},
          Thing: {value: "Porridge", isCorrect:false},
        }
    },
    {
      player_name: "Donovon",
      responses:{
          Boy: {value: "Paul", isCorrect:false},
          Girl: {value: "Porridge", isCorrect:false},
          Celebrity: {value: "Porridge", isCorrect:false},
          Animal: {value: "Porridge", isCorrect:false},
          Place: {value: "Porridge", isCorrect:false},
          Food: {value: "Porridge", isCorrect:false},
          Thing: {value: "Porridge", isCorrect:false},
        }
    },
    {
      player_name: "GKMC",
      responses:{
          Boy: {value: "Peter", isCorrect:false},
          Girl: {value: "Porridge", isCorrect:false},
          Celebrity: {value: "Porridge", isCorrect:false},
          Animal: {value: "Porridge", isCorrect:false},
          Place: {value: "Porridge", isCorrect:false},
          Food: {value: "Porridge", isCorrect:false},
          Thing: {value: "Porridge", isCorrect:false},
        }
    },
    {
      player_name: "Dreezy121",
      responses:{
          Boy: {value: "Pink", isCorrect:false},
          Girl: {value: "Porridge", isCorrect:false},
          Celebrity: {value: "Porridge", isCorrect:false},
          Animal: {value: "Porridge", isCorrect:false},
          Place: {value: "Porridge", isCorrect:false},
          Food: {value: "Porridge", isCorrect:false},
          Thing: {value: "Porridge", isCorrect:false},
        }
    },
  ];


  toggleResponse(player_name:string, field:string){
      this.roomService.responses.forEach((response)=>{
        if(response.player == player_name){
          response.response[field].isCorrect = !response.response[field].isCorrect; 
        }
      })
  }
}
