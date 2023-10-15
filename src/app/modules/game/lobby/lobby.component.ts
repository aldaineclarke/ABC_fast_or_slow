import { Component } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {


  totalInRoom = 6;
    users = [
      {
        username: "David",
        status: "Connected",
        img: "assets/img/ani-profile/penguin.png"
      },
      {
        username: "Johnny76",
        status: "Connected",
        img: "assets/img/ani-profile/penguin.png"
      },
      {
        username: "Wario_must_win",
        status: "Connecting",
        img: "assets/img/ani-profile/penguin.png"
      },
      {
        username: "Marcus",
        status: "Disconnected",
        img: "assets/img/ani-profile/penguin.png"
      },
    ]
}
