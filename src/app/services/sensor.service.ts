import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as environment from '../../environments/environment';
import { Sensor } from '../models/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private url: string = environment.environment.urlEndPoint + '/sensor';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(private http: HttpClient) { }

  getSensores(name:string,token): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda',name);
    this.httpHeaders.set("Authorization", token);
    return this.http.get(this.url + '/sensores',{headers:this.httpHeaders,params:params});
  }

  create(sensor: Sensor,token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.post<any>(this.url + '/sensores', sensor, { headers: this.httpHeaders });
  }

  read(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.get(`${this.url + '/read'}/${id}`,{ headers: this.httpHeaders });
  }

  delete(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.delete<any>(`${this.url + '/read'}/${id}`,{ headers: this.httpHeaders });
  }

  update(sensor: Sensor,token) {
    this.httpHeaders.set("Authorization", token);
    return this.http.put(`${this.url + '/read'}/${sensor.idsensor}`, sensor, { headers: this.httpHeaders });
  }
}
