import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServerComponent } from './create-server/create-server.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: "", 
    children:[
      { path:'',pathMatch:'full', component:HomeComponent, data:{animation: "home"}},
      {path: "create-server", component:CreateServerComponent, data:{animation: "create"}}
    ],
    component: GameComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
