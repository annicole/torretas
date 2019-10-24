import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Color} from '../models/color';
import * as environment from '../../environments/environment';import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private url:string = environment.environment.urlEndPoint+'/color';
  constructor(private http:HttpClient) { }

  getColors(token):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(this.url+'/colores',{headers});
  }

  create(color:Color,token): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
  	return this.http.post<any>(this.url,color,{headers});
  }
}
