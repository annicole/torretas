import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Maquina} from '../models/maquina';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private url:string = environment.environment.urlEndPoint+'/maquina';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getMaquinas():Observable<any>{
    return this.http.get(this.url+'/maquinas');
  }

  create(maquina:Maquina): Observable<any>{
  	return this.http.post<any>(this.url+'/maquinas',maquina,{headers:this.httpHeaders});
  }
}
