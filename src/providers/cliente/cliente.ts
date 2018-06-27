import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { ClienteInterface } from './clienteInterface';

@Injectable()
export class ClienteProvider {

  public clientes: ClienteInterface[] = [];
  private clienteUrl = '/api/cliente';

  private cepUrl = 'https://viacep.com.br/ws/'

  constructor(public http: HttpClient) {
  }

  public addPedido(cep): Observable<ClienteInterface> {   // POST request do pedido p/ BackEnd

    return this.http.post(this.cepUrl +cep+'/json' , cep);
  }

  public addCliente(cliente) {      // POST request de cliente p/ BackEnd
    return new Promise((resolve, reject) => {
      this.http.post(this.clienteUrl, cliente)
        .subscribe((result: any) => {
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  public getClientes(): Observable<ClienteInterface[]> {   // GET request de todos clientes no BackEnd
    return this.http.get(this.clienteUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getClienteById(id_contato: number): Observable<ClienteInterface[]> {  // GET request de cliente por Id no BackEnd
    return this.http.get(this.clienteUrl + '/' + id_contato)
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

  public removeCliente(id_contato: number) { // DELETE request de cliente por Id no backEnd
    this.http.delete(this.clienteUrl + '/' + id_contato, { responseType: 'text' }).subscribe();
  }

  public updateAgenda(id_contato, cliente) {  // PUT request de cliente no BackEnd
   
    return new Promise((resolve, reject) => {

      this.http.put(this.clienteUrl + '/' + id_contato, cliente)
        .subscribe((result: any) => {
        },
          (error) => {
            reject(error.json());
          });
    });
  }
}
