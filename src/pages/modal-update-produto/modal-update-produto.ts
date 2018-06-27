import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


import { ProdutoInterface } from '../../providers/produto/produtointerface';
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-modal-update-produto',
  templateUrl: 'modal-update-produto.html',
})
export class ModalUpdateProdutoPage {

  errorMessage: any;

  public produtos: ProdutoInterface[] = [];
  public nomeproduto = '';
  public descricao   = '';
  public medida      = '';
  public qtdMinima   = '';
  public valor       = '';
  public codigoBarra = '';
  public categoria   = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoProvider: ProdutoProvider,
    private view: ViewController) {
  }

  ionViewWillLoad() {                 // quando carregar chama o getUm e busca o cliente selecionado
    const id = this.navParams.get('id')
    this.buscaProdutoId(id);

  }
  public buscaProdutoId(id_produto: number): void {
 
    this.produtoProvider.getProdutoById(id_produto)
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage = <any>error);
  }

  public atualizarProduto(id_produto: number): void {    // fazer update de cliente por id
    this.produtoProvider.updateProduto(id_produto, this.produtos)
      .then((result: any) => {
      },
        err => {
          console.log(err);
        });
    this.view.dismiss(this.buscaProdutoId(id_produto));
  }

  closeModal() { // fechar modal
    this.view.dismiss();
  }
}
