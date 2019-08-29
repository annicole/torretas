import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Area} from '../models/area';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

private url:string = environment.environment.urlEndPoint+'/area';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getAreas():Observable<any>{
    return this.http.get(this.url+'/areas');
  }

  create(area:Area): Observable<any>{
  	return this.http.post<any>(this.url+'/areas',area,{headers:this.httpHeaders});
  }

  read(id:number):Observable<any>{
    return this.http.get(`${this.url+'/read'}/${id}`);
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url+'/read'}/${id}`);
  }

  update(area:Area){
    return this.http.put(`${this.url+'/read'}/${area.idarea}`,area,{headers:this.httpHeaders});
  }
}
