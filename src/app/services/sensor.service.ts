import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import * as environment from '../../environments/environment';
import {Sensor} from '../models/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private url:string = environment.environment.urlEndPoint+'/sensor';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getSensores():Observable<any>{
    return this.http.get(this.url+'/sensores');
  }

  create(sensor:Sensor): Observable<any>{
  	return this.http.post<any>(this.url,sensor,{headers:this.httpHeaders});
  }
}
