import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cia } from '../models/cia';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiaService {

  private url: string = environment.environment.urlEndPoint + '/cia';

  private httpHeaderFormData = new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  //'Content-Type': 'application/x-www-form-urlencoded'
  // headers: { 'Content-Type': 'multipart/form-data'
  //'Content-type': 'application/json
  constructor(private http: HttpClient) { }

  /*getCias(token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.get(this.url + '/cias');
  }*/

  /*create(cia: Cia): Observable<any> {
    return this.http.post<any>(this.url + '/cias', cia, { headers: this.httpHeaders });
  }*/

  createImage(formdata): Observable<any> {
    return this.http.post<any>(this.url + '/image', formdata, { headers: this.httpHeaderFormData });
  }

  readCia(id: number, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.url + '/read'}/${id}`, { headers });
  }

  update(cia: Cia, token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/read'}/${cia.idcia}`, cia, { headers });
  }
}
