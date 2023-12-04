import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { LetterGeneratorComponent } from '../components/letter-generator/letter-generator.component';
import { Router } from '@angular/router';
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
  letterModalRef!:MatDialogRef<LetterGeneratorComponent>;
  constructor(){
    this.checkRouteStateToShowModal();
  }



  checkRouteStateToShowModal(){
    // had to subscribe to the router events to make sure that if the state is transfered over I would have access to it.
    if(this.router.getCurrentNavigation()?.extras.state){
      this.showModal();
    }
  }
  
  
  
  showModal() {
      this.letterModalRef = this.dialog.open(LetterGeneratorComponent,{});
  }
}
