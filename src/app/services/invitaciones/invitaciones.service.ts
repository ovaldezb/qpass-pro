import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';

@Injectable()
export class InvitacionesService{

  private url:string;

  constructor(private _http: HttpClient){
    this.url = Global.url;
}
  getInvitaciones():Observable<any>{
    return this._http.get(this.url);
  }
}