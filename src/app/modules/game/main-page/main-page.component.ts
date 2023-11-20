import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LetterGeneratorComponent } from '../components/letter-generator/letter-generator.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { RoomService } from 'src/app/services/room.service';
import { GameTimerService } from 'src/app/services/game-timer.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  dialog = inject(MatDialog);
  router = inject(Router);
  socketService = inject(SocketService);
  roomService = inject(RoomService);
  gameTimerService = inject(GameTimerService);
  constructor(){
    this.checkRouteStateToShowModal();
  }

  parseStringCountdownToNum(countdown: string){ // accepts '00:40'
    return parseInt(countdown.split(":")[1]) // returns 40
  }

  checkRouteStateToShowModal(){
    // had to subscribe to the router events to make sure that if the state is transfered over I would have access to it.
    this.router.events.subscribe({
      next:(event)=>{
        if(event instanceof NavigationEnd)
            if(this.router.getCurrentNavigation()?.extras.state){
              this.showModal();
            }
      }
    });
  }
  
  
  
  showModal() {
    this.dialog.open(LetterGeneratorComponent)
  }
}
