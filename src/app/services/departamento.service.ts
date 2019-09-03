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

  getDepartamentos(name:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('busqueda',name);
    return this.http.get(this.url+'/departamentos',{headers:this.httpHeaders,params:params});
  }

  create(departamento:Departamento): Observable<any>{
  	return this.http.post<any>(this.url+'/departamentos',departamento,{headers:this.httpHeaders});
  }

  read(id:number):Observable<any>{
    return this.http.get(`${this.url+'/read'}/${id}`);
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url+'/read'}/${id}`);
  }

  update(departamento:Departamento){
    return this.http.put(`${this.url+'/read'}/${departamento.iddep}`,departamento,{headers:this.httpHeaders});
  }
}
