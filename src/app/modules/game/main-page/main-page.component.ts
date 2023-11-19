import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LetterGeneratorComponent } from '../components/letter-generator/letter-generator.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  dialog = inject(MatDialog);
  router = inject(Router);
  ngOnInit(){
    this.checkRouteStateToShowModal();
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
