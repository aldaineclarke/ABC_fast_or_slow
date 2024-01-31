import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class HttpEndpointsService {
  private BASEURL = environment.apiUrl;
  constructor() { }

  CREATE_SERVER = this.BASEURL+"rooms"
}
