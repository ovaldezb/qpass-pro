import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';


@Injectable({
  providedIn: 'root'
})
export class CondominiosService {

  readonly API_Url = 'http://localhost:5007'

  constructor(private http: HttpClient) { }

  getCondo(id: any): Observable<any[]> {

    return this.http.get<any>(Global.urlCondominios + "/" + id);

  }

  getCondos(): Observable<any[]> {

    return this.http.get<any>(Global.urlCondominios);

  }

  addNewCondo(nuevoCondominio: any) {

    return this.http.post(Global.urlCondominios, nuevoCondominio);

  }

  updateCondominio(id_: any, modifyCondominio: any) {

    return this.http.put(Global.urlCondominios + "/" + id_, modifyCondominio);

  }

  deleteCondominio(id_: any) {

    return this.http.delete(Global.urlCondominios + "/" + id_);

  }


}
