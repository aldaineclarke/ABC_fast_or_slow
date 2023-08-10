import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.scss']
})
export class CreateServerComponent {

  loaderService = inject(LoadingService)
  router = inject(Router);

  items:GameField[]  = [
    {item: "Name", selected:true},
    {item: "Food", selected:true},
    {item: "Place", selected:true},
    {item: "Thing", selected:true},  
  ];

  serverForm = new FormGroup({
    name: new FormControl(''),
    limit: new FormControl(15),
    votingTime: new FormControl(30),
    roundTimeout: new FormControl(30)
  })

  deleteItem(selectedItem: GameField){
    this.items = this.items.filter((item)=> item.item != selectedItem.item);
    console.log(this.items)
  }

  allowEnterToSubmit(event:any){
    if(event.key == 'Enter' && this.columnField?.value){
      this.createField();
    }
  }

  columnField = new FormControl();

  createField(){
    let newField:GameField = {item: "", selected: true};
    newField.item = this.columnField?.value;
    this.items.push(newField);
    this.columnField.reset();
  }

  createServer(){
      // this.loaderService.setMessage({main_message: "Creating Server"});
      console.log("Form Submitted");
      this.router.navigate(['/game/main-page'])
  }
}

interface GameField{
    item: string,
    selected: boolean
}
