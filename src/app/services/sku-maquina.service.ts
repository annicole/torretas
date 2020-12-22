import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkuMaquinaService {

  private url: string = environment.environment.urlEndPoint + '/skuMaquina';
  constructor(private http: HttpClient) { }

  get(token,id): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.get(this.url + '/get', {headers,params:params});
  }

  create(obj, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.post<any>(this.url + '/get', obj, { headers });
  }

  read(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.url + '/read'}/${id}`, { headers });
  }

  updateDown(obj, token, id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/updateDown'}/${id}`, obj, { headers });
  }

  updateUp(obj, token, id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/updateUp'}/${id}`, obj, { headers });
  }

  delete(obj, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams();
    params = params.append('prioridad',obj.prioridad);
    params = params.append('idproducto',obj.idproducto);
    return this.http.delete<any>(`${this.url + '/read'}/${obj.idskumaquina}`, { headers,params:params });
  }
}
