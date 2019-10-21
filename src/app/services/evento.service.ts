import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url:string = environment.environment.urlEndPoint+'/evento';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getEvento(endPoint:string,maquina:string,inicio:string,fin:string,pagina:string,pageSize:string,token):Observable<any>{
    let params = new HttpParams();

    params = params.append('maquina',maquina);
    params = params.append('inicio',inicio);
    params = params.append('fin',fin);
    params = params.append('pagina',pagina);
    params = params.append('paginaL',pageSize);
    this.httpHeaders.set("Authorization", token);
    return this.http.get(this.url+endPoint,{headers:this.httpHeaders,params:params});
  }
}
