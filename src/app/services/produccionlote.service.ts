import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduccionloteService {

  private url: string = environment.environment.urlEndPoint + '/produccionlote';
  constructor(private http: HttpClient) { }

  get(token,id): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.get(this.url + '/produccionlote', {headers,params:params});
  }

  getpreparacion(formp,token): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams();
    params = params.append('tname',formp.tname);
    params = params.append('tnamep',formp.tnamep);
    return this.http.get(this.url + '/getpro', {headers,params:params});
  }

  getlote(formp,token): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams();
    params = params.append('tname',formp.tname);
    params = params.append('tnamep',formp.tnamep);
    params = params.append('product',formp.product);
    params = params.append('cantidadpiezas',formp.cantidadpiezas);
    return this.http.get(this.url + '/get', {headers,params:params});
  }

  createlote(obj, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.post<any>(this.url +'/get', obj, { headers });
  }

  read(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.url + '/read'}/${id}`, { headers });
  }
  
/*
  delete(obj, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams();
    params = params.append('prioridad',obj.prioridad);
    params = params.append('idmaquina',obj.idmaquina);
    params = params.append('idwosub',obj.idwosub);
    return this.http.delete<any>(`${this.url + '/read'}/${obj.idprodregisro}`, { headers,params:params });
  }*/

  delete(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.delete<any>(`${this.url + '/read'}/${id}`, { headers });
  }
  update(obj, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/read'}/${obj.idprodregisro}`, obj, { headers });
  }
}
