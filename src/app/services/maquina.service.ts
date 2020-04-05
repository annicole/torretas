import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Maquina } from '../models/maquina';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private url: string = environment.environment.urlEndPoint + '/maquina';
  chartPage = new Subject();
  constructor(private http: HttpClient) { }

  getMaquinas(name: string, area: string, token): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda', name);
    params = params.append('area', area);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(this.url + '/maquinas', { headers, params: params });
  }

  create(maquina, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.post<any>(this.url + '/maquinas', maquina, { headers});
  }

  read(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.url + '/read'}/${id}`,{headers});
  }

  delete(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.delete<any>(`${this.url + '/read'}/${id}`,{headers});
  }

  update(maquina, token) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/read'}/${maquina.idmaquina}`, maquina, { headers });
  }

  changePage(page, token) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    this.chartPage.next(page);
  }
}
