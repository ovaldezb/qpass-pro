import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  readonly API_Url = 'http://localhost:5007'

  constructor(private http:HttpClient) { }

  getUser(_id:any):Observable<any[]>{

    return this.http.get<any>(this.API_Url + '/Usuarios' + _id);

  }

  getUsers(): Observable<any[]> {

    return this.http.get<any>(this.API_Url + '/Usuarios');

  }


}
