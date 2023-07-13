import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  readonly API_Url = 'http://localhost:5007'

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any[]> {

    return this.http.get<any>(this.API_Url + '/Usuarios/' + id);

  }

  getUsers(): Observable<any[]> {

    return this.http.get<any>(this.API_Url + '/Usuarios');

  }

  addNewUser(nuevoUsuario: any) {

    return this.http.post(this.API_Url + '/Usuarios/', nuevoUsuario);

  }

  updateUser(id_: any, modifyUsuario: any) {

    return this.http.put(this.API_Url + '/Usuarios/' + id_, modifyUsuario);

  }

  deleteUser(id_: any) {

    return this.http.delete(this.API_Url + '/Usuarios/' + id_);

  }

}
