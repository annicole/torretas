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

  getUsuarios(name:string,depatamento:string,token): Observable<any> {
    let params = new HttpParams();
    params = params.append('busqueda',name);
    params = params.append('departamento',depatamento);
    this.httpHeaders.set("Authorization",token);
    return this.http.get(this.url + '/usuarios',{headers:this.httpHeaders,params:params});
  }

  create(usuario: Usuario,token): Observable<any> {
    this.httpHeaders.set("Authorization",token);
    return this.http.post<any>(this.url + '/usuarios', usuario, { headers: this.httpHeaders });
  }

  readUsuario(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization",token);
    return this.http.get(`${this.url + '/read'}/${id}`,{headers:this.httpHeaders});
  }

  delete(id: number,token): Observable<any> {
    this.httpHeaders.set("Authorization",token);
    return this.http.delete<any>(`${this.url + '/read'}/${id}`,{headers:this.httpHeaders});
  }

  update(usuario: Usuario,token) {
    this.httpHeaders.set("Authorization",token);
    return this.http.put(`${this.url + '/read'}/${usuario.id}`, usuario, { headers: this.httpHeaders });
  }
}
