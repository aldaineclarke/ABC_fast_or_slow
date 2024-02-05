import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, mergeMap, of, switchMap } from 'rxjs';
import { IRoom } from 'src/app/interfaces/room.interface';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { HttpEndpointsService } from 'src/app/services/http-endpoints.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent {

  loaderService = inject(LoadingService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  apiService = inject(ApiHttpService);
  notif = inject(ToastrService);
  httpEndpoints = inject(HttpEndpointsService);
  roomFormData!: {status:Object, privacy:Object};
  room_id = "";
  items:GameField[]  = [];
  fetchRoomData$!: Observable<IRoom>;

  ngOnInit(){
    this.fetchRoomData$ = this.apiService.get(this.httpEndpoints.GET_CREATE_SERVER_FORMDATA).pipe(
      switchMap((res) => {
        this.roomFormData = res["data"];
        return this.route.paramMap;
      }),
      switchMap((paramMap) => {
        const id = paramMap.get("id");
        this.room_id = id!;
        if (!id) {
          alert("No ID Passed");
        }
        return this.apiService.get(this.httpEndpoints.ROOMSENDPOINT + id);
      }),
      mergeMap((res)=>{
        let roomData:IRoom = res.data.room;
        this.updateFormDataValues(roomData, this.roomFormData.privacy, "privacy")
        this.updateFormDataValues(roomData, this.roomFormData.status,"status");
        this.setFields(roomData.gameFields);
        this.setServerFormValues(roomData);
        return of(roomData);
      })
      )


  }

  getRoomData(){
    
  }

  serverForm = new FormGroup({
    name: new FormControl(''),
    player_limit: new FormControl(15),
    voting_duration: new FormControl(30),
    round_duration: new FormControl(30),
    round_limit: new FormControl(10),
    privacy: new FormControl (),
    status: new FormControl()
  })

  private updateFormDataValues(obj: any, formData: any, property:string): void {
    for (const [key, val] of Object.entries(formData)) {
      if (val === obj[property]) {
        obj[property] = +key;
        break;
      }
    }
  }
  
  private setServerFormValues(roomData: IRoom): void {
    this.serverForm.setValue({
      name: roomData.name,
      player_limit: roomData.player_limit,
      privacy: roomData.privacy,
      status: roomData.status,
      round_duration: roomData.round_duration,
      round_limit: roomData.round_limit,
      voting_duration: roomData.voting_duration,
    });
  }

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
    let newField:GameField = {item: ""};
    newField.item = this.columnField?.value;
    this.items.push(newField);
    this.columnField.reset();
  }

  private setFields(fields:string[]){
    this.items = fields.map((field)=>{
        return {item: field}
    })
  }

  updateServer(){
      this.loaderService.setMessage({main_message: "Updating Server", side_messages:["This will take some time"]});
      let gameFields = [];
      for(let i = 0; i < this.items.length ; i ++){
          gameFields.push(this.items[i].item);
      }

      this.apiService.patch(this.httpEndpoints.ROOMSENDPOINT+this.room_id, {...this.serverForm.value, gameFields}).subscribe({
        next:(response)=>{
            this.loaderService.killLoader();
            this.notif.success("Successfully updated room data")
            this.router.navigate(["/profile"]);
        }
      })
  }
}

interface GameField{
    item: string,
}
