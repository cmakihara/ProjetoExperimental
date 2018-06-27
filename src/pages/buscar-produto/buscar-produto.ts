import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Modal, ModalController } from 'ionic-angular';

import { ProdutoInterface } from '../../providers/produto/produtoInterface';
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-buscar-produto',
  templateUrl: 'buscar-produto.html',
})
export class BuscarProdutoPage implements OnInit {

  public loading: Loading;
  errorMessage: any;
  public produtos: ProdutoInterface[] = [];
  public novalista: ProdutoInterface[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private produtoProvider: ProdutoProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

  }

  public ngOnInit() {
    this.loading.present();
    this.getProdutos();
    this.loading.dismiss();
  }

  ionViewDidLoad() {
  
  }

  public getProdutos(): void {        //busca todos produtos cadastrados
    this.produtoProvider.getProdutos()
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage = <any>error);
  }

  public getBusca(ev) {   //busca pela nome digitado

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
  }

  abrirModalDadosProdutos(id_produto: number) {    // abre modal com os dados do cliente selecionado
    const myModal: Modal = this.modal.create("ModalDadosProdutoPage", {
      id: id_produto
    });
    myModal.present();
    myModal.onDidDismiss(res => {
      this.getProdutos();
    });
  }
}
