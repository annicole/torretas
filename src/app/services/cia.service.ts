import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Cia} from '../models/cia';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiaService {

  private url:string = environment.environment.urlEndPoint+'/cia';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getCias():Observable<any>{
    return this.http.get(this.url+'/cias');
  }

  create(cia:Cia): Observable<any>{
  	return this.http.post<any>(this.url+'/cias',cia,{headers:this.httpHeaders});
  }

  readCia(id:number):Observable<any>{
    return this.http.get(`${this.url+'/read'}/${id}`);
  }
}
