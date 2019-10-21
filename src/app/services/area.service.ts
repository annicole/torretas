import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Area } from '../models/area';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url: string = environment.environment.urlEndPoint + '/area';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(private http: HttpClient) { }

  getAreas(name: string, token): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda', name);
    this.httpHeaders.set("Authorization", token);
    return this.http.get(this.url + '/areas', { headers: this.httpHeaders, params: params });
  }

  create(area: Area, token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.post<any>(this.url + '/areas', area, { headers: this.httpHeaders });
  }

  read(id: number, token): Observable<any> {
    this.httpHeaders.set("Authorization", token);
    return this.http.get(`${this.url + '/read'}/${id}`,{headers:this.httpHeaders});
  }

  delete(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization",token);
    return this.http.delete<any>(`${this.url + '/read'}/${id}`,{headers:this.httpHeaders});
  }

  update(area: Area,token) {
    this.httpHeaders.set("Authorization",token);
    return this.http.put(`${this.url + '/read'}/${area.idarea}`, area, { headers: this.httpHeaders });
  }
}
