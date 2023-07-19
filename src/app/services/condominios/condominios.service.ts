import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { Condominio } from 'src/app/models/condominio';

@Injectable()
export class CondominiosService {
  private url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) {
    this.url = Global.urlCondominios + '/condominio';
  }

  addCondominio(condominio: Condominio): Observable<any> {
    return this._http.post(this.url, JSON.stringify(condominio), {
      headers: this.headers,
    });
  }

  getCondominio(idCondominio: any): Observable<any> {
    return this._http.get(this.url + '/' + idCondominio, {
      headers: this.headers,
    });
  }
  getCondominios(): Observable<any> {
    return this._http.get(this.url, { headers: this.headers });
  }

  deleteCondominio(idCondominio: String): Observable<any> {
    return this._http.delete(this.url + '/' + idCondominio, {
      headers: this.headers,
    });
  }

  updateCondominio(
    idCondominio: String,
    condominio: Condominio
  ): Observable<any> {
    return this._http.put(
      this.url + '/' + idCondominio,
      JSON.stringify(condominio),
      { headers: this.headers }
    );
  }
}
