import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { UsuarioInterface } from './usuarioInterface';

@Injectable()
export class UsuarioProvider {

  private usuarioUrl = '/api/usuario'

  constructor(public http: HttpClient) {
  }

  public login(usuario): Observable<UsuarioInterface> {   // Verifica se o login do usuario existe 
    localStorage.setItem("usuario_senha",usuario.senha);
    return this.http.post(this.usuarioUrl + "/login", usuario);
  }

  public addUsuario(usuario) {  // POST request do usuario p/ BackEnd          
    return new Promise((resolve, reject) => {
      this.http.post(this.usuarioUrl, usuario)
        .subscribe((result: any) => {
        },
          (error) => {
            console.log('erro')
            reject(error.json());
          });
    });
  }

  public getUsuarios(): Observable<UsuarioInterface[]> {   // GET request de todos usuario no BackEnd
    return this.http.get(this.usuarioUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUsuarioById(id_usuario: number): Observable<UsuarioInterface[]> {  // GET request de usuario por Id no BackEnd
    return this.http.get(this.usuarioUrl + '/' + id_usuario)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public removeUsuario(id_usuario: number) { // DELETE request de usuario por Id no backEnd
    this.http.delete(this.usuarioUrl + '/' + id_usuario, { responseType: 'text' }).subscribe();
  }

  public updateUsuario(id_usuario, usuario) {  // PUT request de usuario no BackEnd
    return new Promise((resolve, reject) => {

      this.http.put(this.usuarioUrl + '/' + id_usuario, usuario)
        .subscribe((result: any) => {
        },
          (error) => {
            reject(error.json());
          });
    });
  }

}