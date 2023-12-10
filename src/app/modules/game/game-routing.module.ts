import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServerComponent } from './create-server/create-server.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomGuard } from 'src/app/guards/room.guard';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  {
    path: "", 
    children:[
      { path:'',pathMatch:'full', component:HomeComponent, data:{animation: "home"}},
      {path: "create-room", component:CreateServerComponent, data:{animation: "create"}},
      {path: "main-page", canDeactivate:[new RoomGuard().canDeactivate], component:MainPageComponent, data:{animation: "create"}},
      {path: "lobby/:room_id", component:LobbyComponent, data:{animation: "create"}},
      {path: "voting-screen", component:VotingComponent, data:{animation: "create"}}
    ],
    component: GameComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
