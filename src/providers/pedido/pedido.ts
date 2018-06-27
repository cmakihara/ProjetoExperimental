import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { PedidoInterface } from './pedidoInterface';
import { ItemPedidoInterface } from '../item-pedido/item-pedidoInterface';

@Injectable()
export class PedidoProvider {
  public pedido: PedidoInterface[] = [];

  private pedidoUrl = '/api/pedido';
  constructor(public http: HttpClient) {

  }
  public addPedido(pedido): Observable<PedidoInterface> {   // POST request do pedido p/ BackEnd

    return this.http.post(this.pedidoUrl, pedido);
  }
  getHistorico(id_pedido: number): Observable<PedidoInterface[]> {
    return this.http.get(this.pedidoUrl + '/cliente/' + id_pedido)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public enviarEmailPrestadora(list:ItemPedidoInterface[]){
    return this.http.post(
      this.pedidoUrl+'/email/empresa', list
    )
  }

  public confirmarPedido(id: string) {
    return this.http.get(this.pedidoUrl + '/confirmar/' + Number(id));
  }

  public enviarEmailCliente(list:ItemPedidoInterface[]){
    return this.http.post(
      this.pedidoUrl+'/email/cliente', list
    )
  }


  getOrcamentos() : Observable<PedidoInterface[]> {  // GET request de todos pedido no BackEnd
    return this.http.get(this.pedidoUrl + '/naoconfirmados')
      .map(this.extractData)
      .catch(this.handleError);
  }
  getPedidosOk() : Observable<PedidoInterface[]> {  // GET request de todos pedido no BackEnd
    return this.http.get(this.pedidoUrl + '/confirmados')
      .map(this.extractData)
      .catch(this.handleError);
  }


  getPedidos(): Observable<PedidoInterface[]> {  // GET request de todos pedido no BackEnd
    return this.http.get(this.pedidoUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getPedidoById(id_pedido: number): Observable<PedidoInterface[]> {  // GET request de pedido por Id no BackEnd
    return this.http.get(this.pedidoUrl + '/' + id_pedido)
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
}
