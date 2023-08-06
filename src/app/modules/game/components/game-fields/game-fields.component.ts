import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-game-fields',
  templateUrl: './game-fields.component.html',
  styleUrls: ['./game-fields.component.scss']
})
export class GameFieldsComponent {
    @Input('game-fields') fields : string[] =[];
    gameForm = new FormGroup({});
    ngOnInit(){
      this.fields.forEach((field)=>{
        this.gameForm.addControl(`field-${field}`, new FormControl());
      });
    }

}
