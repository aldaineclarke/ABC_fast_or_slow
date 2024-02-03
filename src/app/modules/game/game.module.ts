import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateServerComponent } from './create-server/create-server.component';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LetterGeneratorComponent } from './components/letter-generator/letter-generator.component';
import { GameFieldsComponent } from './components/game-fields/game-fields.component';
import { LobbyComponent } from './lobby/lobby.component';
import { VotingComponent } from './voting/voting.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { LeaveConfirmationComponent } from './components/leave-confirmation/leave-confirmation.component';
import { EditServerComponent } from './edit-server/edit-server.component';



@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    CreateServerComponent,
    GameComponent,
    LetterGeneratorComponent,
    GameFieldsComponent,
    LobbyComponent,
    VotingComponent,
    ScoreboardComponent,
    LeaveConfirmationComponent,
    EditServerComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule
  ]
})
export class GameModule { }
