import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SlideFromLeft } from './utilities/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    SlideFromLeft
  ]
})
export class AppComponent {
  title = 'ABC_fast_or_slow';
  // router = inject(Router);
  // ngOnInit(){
  //   this.router.events.subscribe({
  //     next: (route)=>{
  //       console.log(route)
  //     }
  //   })
  // }


}
