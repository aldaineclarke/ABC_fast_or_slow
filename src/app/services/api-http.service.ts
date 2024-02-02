import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  private _http = inject(HttpClient);

  private configureQueryParams(queryParams:string | {[x: string]:string}):string|undefined {
    let qp = undefined;
    if(typeof(queryParams) === "string"){
      qp = "?" + queryParams;
    }else if (typeof(queryParams) === "object"){
      qp = "?" + new HttpParams({fromObject: queryParams}).toString();

    } 
    return qp;
  }

  public get(url:string, queryParams?: string | {[x:string]:string}):Observable<any>{
    let qp = (queryParams)? this.configureQueryParams(queryParams) : "";
    return this._http.get(`${url}${qp}`, );
  }

  public patch(url:string, data:any, queryParams ?: string | {[x:string]:string}){
    if(queryParams){
      let qp = this.configureQueryParams(queryParams);
      return this._http.patch(url+qp, data);
    }
    return this._http.patch(url, data);
  }


  public post(url: string, data:any, queryParams?: string | {[x:string]:string}){
    if(queryParams){
      let qp = this.configureQueryParams(queryParams);
      return this._http.post(url+qp, data);
    }
    return this._http.post(url, data);
  }

  public put(url:string, data:any, queryParams?: string | {[x:string]:string}){
    if(queryParams){
      let qp = this.configureQueryParams(queryParams);
      return this._http.put(url+qp, data);
    }
    return this._http.put(url, data);
  }

  public delete(url:string, queryParams?: string | {[x:string]:string}){
    if(queryParams){
      let qp = this.configureQueryParams(queryParams);
      return this._http.delete(url+qp);
    }
    return this._http.delete(url);
  }
  


}


