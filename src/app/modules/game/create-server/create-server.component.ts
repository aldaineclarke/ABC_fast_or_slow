import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { HttpEndpointsService } from 'src/app/services/http-endpoints.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.scss']
})
export class CreateServerComponent {

  loaderService = inject(LoadingService);
  router = inject(Router);
  apiService = inject(ApiHttpService);
  httpEndpoints = inject(HttpEndpointsService);

  items:GameField[]  = [
    {item: "Name", selected:true},
    {item: "Food", selected:true},
    {item: "Place", selected:true},
    {item: "Thing", selected:true},  
  ];

  serverForm = new FormGroup({
    name: new FormControl(''),
    player_limit: new FormControl(15),
    voting_duration: new FormControl(30),
    round_duration: new FormControl(30),
    round_limit: new FormControl(10)
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
      this.loaderService.setMessage({main_message: "Creating Server", side_messages:["This will take some time"]})
      this.apiService.post(this.httpEndpoints.CREATE_SERVER, this.serverForm.value).subscribe({
        next:(response)=>{
            this.loaderService.killLoader();
            this.router.navigate(["/profile"]);
        }
      })
  }
}

interface GameField{
    item: string,
    selected: boolean
}
