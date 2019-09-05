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

  getSensores(name:string): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda',name);
    return this.http.get(this.url + '/sensores',{headers:this.httpHeaders,params:params});
  }

  create(sensor: Sensor): Observable<any> {
    return this.http.post<any>(this.url + '/sensores', sensor, { headers: this.httpHeaders });
  }

  read(id: number): Observable<any> {
    return this.http.get(`${this.url + '/read'}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url + '/read'}/${id}`);
  }

  update(sensor: Sensor) {
    return this.http.put(`${this.url + '/read'}/${sensor.idsensor}`, sensor, { headers: this.httpHeaders });
  }
}
