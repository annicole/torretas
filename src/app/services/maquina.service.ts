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
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })
  chartPage = new Subject();
  constructor(private http: HttpClient) { }

  getMaquinas(name:string,area:string,token): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda',name);
    params = params.append('area',area);
    this.httpHeaders.set("Authorization", token);
    return this.http.get(this.url + '/maquinas',{headers:this.httpHeaders,params:params});
  }

  create(maquina: Maquina,token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.post<any>(this.url + '/maquinas', maquina, { headers: this.httpHeaders });
  }

  read(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.get(`${this.url + '/read'}/${id}`);
  }

  delete(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.delete<any>(`${this.url + '/read'}/${id}`);
  }

  update(maquina: Maquina,token) {
    this.httpHeaders.set("Authorization", token);
    return this.http.put(`${this.url + '/read'}/${maquina.idmaquina}`, maquina, { headers: this.httpHeaders });
  }

  changePage(page,token) {
    this.httpHeaders.set("Authorization", token);
    this.chartPage.next(page);
  }
}
