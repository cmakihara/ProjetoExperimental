import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Modal } from 'ionic-angular';

import { ProdutoProvider } from '../../providers/produto/produto';

import { ProdutoInterface } from '../../providers/produto/produtoInterface';

@IonicPage()
@Component({
  selector: 'page-modal-produto',
  templateUrl: 'modal-venda-produto.html',
})
export class ModalProdutoPage {
  errorMessage: any;
  public produtos: ProdutoInterface[] = [];
  public novalista: ProdutoInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoProvider: ProdutoProvider,
    private view: ViewController,
    public modal: ModalController) {

    this.buscaProdutos();  //ao abrir modal mostrar todos produto
  }

  ionViewDidLoad() {

  }

  public closeModal() {        // fechar modal 
    this.view.dismiss();
  }

  public buscaProdutos(): void {  //metodos para busca todos produtos
    this.produtoProvider.getProdutos()
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage = <any>error);
  }

  public getBusca(ev) {   //busca por digitação
    var val = ev.target.value;

    if (this.produtos.length > this.novalista.length) {
      this.novalista = this.produtos;
    }
    else {
      this.produtos = this.novalista;
    }
    if (val && val.trim() != '') {
      this.produtos = this.produtos.filter((item) => {
        return (item.nomeproduto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    else {
      this.buscaProdutos();
    }
  }

  public abrirModalDadosProduto(id_produto: number) {    // abre modal para atualizar com os dados do produto selecionado
    const myModal: Modal = this.modal.create('ModalVendaDadosProdutoPage', { id: id_produto });
    myModal.present();
    myModal.onDidDismiss((data) => {
      this.view.dismiss(data);
    })
  }
}
