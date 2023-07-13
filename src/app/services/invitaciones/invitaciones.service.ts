import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { Invitacion } from 'src/app/models/invitacion';

@Injectable()
export class InvitacionesService{

  private headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private _http: HttpClient){

  }

  addInvitation(invitacion:Invitacion):Observable<any>{
    return this._http.post(Global.urlInvitacion,JSON.stringify(invitacion),{headers:this.headers});
  }

  getInvitaciones():Observable<any>{
    return this._http.get(Global.urlInvitacion,{headers:this.headers});
  }

  deleteInvitacion(idInvitacion:String):Observable<any>{
    return this._http.delete(Global.urlInvitacion+'/'+idInvitacion,{headers:this.headers});
  }

  updateInvitacion(idInvitacion:String, invitacion:Invitacion):Observable<any>{
    return this._http.put(Global.urlInvitacion+'/'+idInvitacion,JSON.stringify(invitacion),{headers:this.headers});
  }

}