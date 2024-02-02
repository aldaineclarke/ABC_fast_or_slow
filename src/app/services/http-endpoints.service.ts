import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class HttpEndpointsService {
  private BASEURL = environment.apiUrl;
  constructor() { }

  ROOMSENDPOINT = this.BASEURL+"rooms/";
  GET_CREATE_SERVER_FORMDATA = this.BASEURL+"rooms/create";
  USERPROFILE = this.BASEURL+"userprofile";
}
