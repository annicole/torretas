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
  constructor(private http: HttpClient) { }

  getUsuarios(name:string,depatamento:string,token): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda',name);
    params = params.append('departamento',depatamento);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(this.url + '/usuarios',{headers,params:params});
  }

  create(usuario: Usuario,token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.post<any>(this.url + '/usuarios', usuario, { headers });
  }

  readUsuario(id: number,token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.url + '/read'}/${id}`,{headers});
  }

  delete(id: number,token): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.delete<any>(`${this.url + '/read'}/${id}`,{headers});
  }

  update(usuario: Usuario,token) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.put(`${this.url + '/read'}/${usuario.id}`, usuario, { headers });
  }
}
