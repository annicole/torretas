import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Maquina} from '../models/maquina';
import * as environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {
  private url:string = environment.environment.urlEndPoint+'/grafica';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getGrafica(maquina:string,inicio:string,fin:string,bandera:string):Observable<any>{
    let params = new HttpParams();

    params = params.append('maquina',maquina);
    params = params.append('inicio',inicio);
    params = params.append('fin',fin);
    params = params.append('bandera',bandera);
    return this.http.get(this.url+'/graficaSensor',{headers:this.httpHeaders,params:params});
  }
}
