import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { ModuloInterfaz } from '../models/moduloInterfaz';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloInterfazService {

  private url: string = environment.environment.urlEndPoint + '/moduloInterfaz';
  constructor(private http: HttpClient) { }

  getModuloInterfaz(token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(this.url + '/get', { headers });
  }

  create(modulo, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.post<any>(this.url + '/get', modulo, { headers });
  }

  read(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.url + '/read'}/${id}`, { headers });
  }

  update(modulo, token): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/read'}/${modulo.idmodulo}`, modulo, { headers });
  }

}