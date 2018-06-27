import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ProdutoProvider } from '../../providers/produto/produto';

import { ProdutoInterface } from '../../providers/produto/produtoInterface';

@IonicPage()
@Component({
  selector: 'page-modal-venda-dados-produto',
  templateUrl: 'modal-venda-dados-produto.html',
})
export class ModalVendaDadosProdutoPage {
  errorMessage: any;
  public produtos: ProdutoInterface[] = [];

  quantidade: any = 1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoProvider: ProdutoProvider,
    private view: ViewController,
    public modal: ModalController) {
  }

  public closeModal() {    // fechar modal
    this.view.dismiss();
  }

  ionViewWillLoad() {                 // quando carregar chama o getUm e busca o produto selecionado
    const id = this.navParams.get('id')
    this.BuscaProduto(id);
  }

  public produtoSelecionado(id: number) {
    const data = {
      qtd: this.quantidade,
      id_produto: id
    };
    this.view.dismiss(data);
  }

  public BuscaProduto(id_produto: number): void {    //  busca o cliente selecionado cadastrado    
    this.produtoProvider.getProdutoById(id_produto)
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage = <any>error);
  }
}
