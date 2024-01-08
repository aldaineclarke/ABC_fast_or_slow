import { Component, inject } from '@angular/core';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
    scoreboardData: {player: string, response:{[key:string]: {value:string ,votes:number}}}[] = [];
    roomService = inject(RoomService);
    gameTimerService = inject(GameTimerService);
    ProxyObject = Object;
    ngOnInit(){
      this.scoreboardData = this.roomService.roundTally;

    }

    calculateScore(tally: {[key:string]: {value: string, votes: number}}){
     let val =  Object.entries(tally).reduce((accum, [key, value])=>{ 
      return accum + ((value.votes > 0) ? 1 : 0);
    }, 0);
     return val;
    }

}
