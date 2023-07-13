import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondominiosService {

  readonly API_Url = 'http://localhost:5007'

  constructor(private http: HttpClient) { }

  getCondo(id: any): Observable<any[]> {

    return this.http.get<any>(this.API_Url + '/Condominios/' + id);

  }

  getCondos(): Observable<any[]> {

    return this.http.get<any>(this.API_Url + '/Condominios');

  }

  addNewCondo(nuevoCondominio: any) {

    return this.http.post(this.API_Url + '/Condominios/', nuevoCondominio);

  }

  updateCondominio(id_: any, modifyCondominio: any) {

    return this.http.put(this.API_Url + '/Condominios/' + id_, modifyCondominio);

  }

  deleteCondominio(id_: any) {

    return this.http.delete(this.API_Url + '/Condominios/' + id_);

  }


}
