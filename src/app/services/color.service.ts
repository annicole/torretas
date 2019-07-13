import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Color} from '../models/color';
import * as environment from '../../environments/environment';import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private url:string = environment.environment.urlEndPoint;
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getColors():Observable<any>{
    return this.http.get(this.url);
  }

  create(color:Color): Observable<any>{
  	return this.http.post<any>(this.url,color,{headers:this.httpHeaders});
  }
}
