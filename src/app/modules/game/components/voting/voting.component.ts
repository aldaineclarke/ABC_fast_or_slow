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
  ProxyObject = Object;
  user_responses:{player_name:string, responses:{[x:string]: any}}[] = [
    {
      player_name: "Johnny",
      responses: {
          Boy:{value: "Peter", isCorrect:false},
          Girl: "Paula",
          Celebrity: "Polo G",
          Animal: "Panther",
          Place: "PetersBurg",
          Food: "Porridge",
          Thing: "Pot",
        }
    },
    {
      player_name: "WizKid",
      responses:{
          Boy: {value: "Pink", isCorrect:false},
          Girl: "Philisha",
          Celebrity: "Prince",
          Animal: "Penguin",
          Place: "Philadelphia",
          Food: "Potroast",
          Thing: "Pan",
        }
    },
    {
      player_name: "Donovon",
      responses:{
          Boy: {value: "Paul", isCorrect:false},
          Girl: "Penny",
          Celebrity: "Pink Sweats",
          Animal: "Pheasant",
          Place: "Pensilvania",
          Food: "Peanuts",
          Thing: "Pantheon",
        }
    },
    {
      player_name: "GKMC",
      responses:{
          Boy: {value: "Peter", isCorrect:false},
          Girl: "Patty",
          Celebrity: "Prince",
          Animal: "Pretty Bird",
          Place: "Pensilvania",
          Food: "Peanuts",
          Thing: "Pen",
        }
    },
    {
      player_name: "Dreezy121",
      responses:{
          Boy: {value: "Pink", isCorrect:false},
          Girl: "Philisha",
          Celebrity: "P Diddy",
          Animal: "Penguin",
          Place: "Poland",
          Food: "Pancake",
          Thing: "Pan",
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
