import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  rooms = [
    {
      room_id: "this_id",
      room_name: "Kamikaze",
      room_status: "Active",
      player_limit: 4,
    },
    {
      room_id: "this_id1",
      room_name: "Her Loss",
      room_status: "InProgress",
      player_limit: 8,
    },
    {
      room_id: "this_id2",
      room_name: "Good Kid Mad City",
      room_status: "Inactive",
      player_limit: 16,
    },
  ]

}
