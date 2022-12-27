import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { Invitacion } from 'src/app/models/invitacion';

@Injectable()
export class InvitacionesService{

  private url:string;
  private headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private _http: HttpClient){
    this.url = Global.url;
}

  addInvitation(invitacion:Invitacion):Observable<any>{
    return this._http.post(this.url,JSON.stringify(invitacion));
  }

  getInvitaciones():Observable<any>{
    return this._http.get(this.url);
  }

  deleteInvitacion(idInvitacion:String):Observable<any>{
    return this._http.delete(this.url+'/'+idInvitacion);
  }

  updateInvitacion(idInvitacion:String, invitacion:Invitacion):Observable<any>{
    return this._http.put(this.url+'/'+idInvitacion,JSON.stringify(invitacion),{headers:this.headers});
  }

}