import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Departamento} from '../models/departamento';
import {Observable,of} from 'rxjs';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url:string = environment.environment.urlEndPoint+'/departamento';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getDepartamentos():Observable<any>{
    return this.http.get(this.url+'/departamentos');
  }

  create(departamento:Departamento): Observable<any>{
  	return this.http.post<any>(this.url+'/departamentos',departamento,{headers:this.httpHeaders});
  }
}
