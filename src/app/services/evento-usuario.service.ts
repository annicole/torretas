import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as environment from '../../environments/environment';
import { AxisBullet } from '@amcharts/amcharts4/charts';

@Injectable({
  providedIn: 'root'
})
export class EventoUsuarioService {

  private url: string = environment.environment.urlEndPoint + '/evento';
  constructor(private http: HttpClient) { }

  get(token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    console.log("Holagetservice");
    return this.http.get(this.url + '/eventos', { headers });
  }
}
