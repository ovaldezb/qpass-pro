import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosfinalesService {

  constructor(private http: HttpClient) { }


  readonly API_Url = 'http://localhost:5007'


  getUser(id: any): Observable<any[]> {

    return this.http.get<any>(Global.urlUsuarios + "/" + id);

  }

  getUsers(): Observable<any[]> {

    return this.http.get<any>(Global.urlUsuarios);

  }

  addNewUser(nuevoUsuario: any) {

    return this.http.post(Global.urlUsuarios, nuevoUsuario);

  }

  updateUser(id_: any, modifyUsuario: any) {

    return this.http.put(Global.urlUsuarios + "/" + id_, modifyUsuario);

  }

  deleteUser(id_: any) {

    return this.http.delete(Global.urlUsuarios + "/" + id_);

  }




}


