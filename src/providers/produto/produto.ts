import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { ProdutoInterface } from './produtoInterface';

@Injectable()
export class ProdutoProvider {

  public produtos: ProdutoInterface[] = [];

  private produtosUrl = '/api/produto';
  constructor(public http: HttpClient) {

  }
  public addProduto(produto) {    // POST request do produto p/ BackEnd
    return new Promise((resolve, reject) => {
      this.http.post(this.produtosUrl, produto)
        .subscribe((result: any) => {
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  public getProdutos(): Observable<ProdutoInterface[]> {  // GET request de todos produtos no BackEnd
    return this.http.get(this.produtosUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getProdutoById(id_produto: number): Observable<ProdutoInterface[]> {  // GET request de produto por Id no BackEnd  
    return this.http.get(this.produtosUrl + '/' + id_produto)
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

  public updateProduto(id_produto, produto) {   // PUT request de produto por Id no BackEnd
    return new Promise((resolve, reject) => {
      this.http.put(this.produtosUrl + '/' + id_produto, produto)
        .subscribe((result: any) => {
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  public removeProduto(id_produto: number) { // DELETE request de produto por Id no backEnd
    this.http.delete(this.produtosUrl + '/' + id_produto, { responseType: 'text' }).subscribe();
  }
}
