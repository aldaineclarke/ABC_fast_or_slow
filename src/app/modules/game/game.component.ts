import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { SlideFromLeft } from 'src/app/utilities/route-animations';
import { slideLeftAnimation } from 'src/app/utilities/route-transitions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations:[
    slideLeftAnimation
  ]
})
export class GameComponent {
  contexts = inject(ChildrenOutletContexts);

  ngOnInit(){
    console.log("I am in the component")
  }
  prepareRoute(routerOutlet:RouterOutlet){
    return this.contexts.getContext("primary")?.route?.snapshot?.data?.['animation'];
  }
}
