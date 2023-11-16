import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LetterGeneratorComponent } from '../components/letter-generator/letter-generator.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  dialog = inject(MatDialog);
  ngOnInit(){
    this.showModal();
  }
  
  
  
  showModal() {
    this.dialog.open(LetterGeneratorComponent)
  }
}
