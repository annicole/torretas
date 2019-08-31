import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as environment from '../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = environment.environment.urlEndPoint + '/usuario';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url + '/usuarios');
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url + '/usuarios', usuario, { headers: this.httpHeaders });
  }

  readUsuario(id: number): Observable<any> {
    return this.http.get(`${this.url + '/read'}/${id}`);
  }

  read(id: number): Observable<any> {
    return this.http.get(`${this.url + '/read'}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url + '/read'}/${id}`);
  }

  update(usuario: Usuario) {
    return this.http.put(`${this.url + '/read'}/${usuario.id}`, usuario, { headers: this.httpHeaders });
  }
}
