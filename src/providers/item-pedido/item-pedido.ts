import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemPedidoInterface } from './item-pedidoInterface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemPedidoProvider {
  private itemPedidoUrl = '/api/itemPedido'
  constructor(public http: HttpClient) {
  }

  public getItemPedido(): Observable<ItemPedidoInterface[]> {  // GET request de cliente por Id no BackEnd
    return this.http.get(this.itemPedidoUrl)
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

  getItensPedido(id_pedido: number): Observable<ItemPedidoInterface[]> {
    return this.http.get(this.itemPedidoUrl + '/pedido/'+ id_pedido)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public addItemPedido(itemPedido) {     // POST request de pedido p/ BackEnd
    return new Promise((resolve, reject) => {
  
      this.http.post(this.itemPedidoUrl, itemPedido)
        .subscribe((result: any) => {
        },
          (error) => {
            reject(error.json());
          });
    });
  }

}
