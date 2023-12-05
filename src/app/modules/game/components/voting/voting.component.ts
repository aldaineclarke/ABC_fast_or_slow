import { Component, inject } from '@angular/core';
import { GameTimerService } from 'src/app/services/game-timer.service';

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
  ngOnInit(){
    this.gameTimerService.setTimer();
    this.gameTimerService.startTimer()
  }
  gameFields = [
    "Boy",
    "Girl",
    "Celebrity",
    "Animal",
    "Place",
    "Thing"
  ];
  field_index=  0;
  gotoNextField(){
    if(this.field_index < this.gameFields.length-1){
      this.field_index++;
    }
    console.log(this.field_index)
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
      this.user_responses.forEach((response)=>{
        if(response.player_name == player_name){
          response.responses[field].isCorrect = !response.responses[field].isCorrect; 
        }
      })
  }
}
