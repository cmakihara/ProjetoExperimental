import { PedidoInterface } from './../../providers/pedido/pedidoInterface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading, Modal } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-list-orcamento',
  templateUrl: 'list-orcamento.html',
})
export class ListOrcamentoPage {
  errorMessage: any;
  public loading: Loading;
  public pedidos: PedidoInterface[] = [];
  public novalista: PedidoInterface[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoProvider: PedidoProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController
  ) {

    this.getOrcamentos();
  }

  ionViewWillEnter() {


  }

  abrirModalOrcamento(id_pedido: number) {
    const myModal: Modal = this.modal.create("ModalOrcamentoPage", {
      id: id_pedido
    });
    myModal.onDidDismiss(() => this.getOrcamentos());
    myModal.present();
  }
  //----
  public getOrcamentos(): void {    //  busca todos os pedidos cadastrados
    this.pedidoProvider
      .getOrcamentos()
      .subscribe(
        pedidos => (this.pedidos = pedidos),
        error => (this.errorMessage = <any>error)
      );
  }
  //----

  public getBusca(ev) {    //  busca pelo nome digitado

    var val = ev.target.value;

    if (this.pedidos.length > this.novalista.length) {
      this.novalista = this.pedidos;
    } else {
      this.pedidos = this.novalista;
    }

    if (val && val.trim() != "") {
      this.pedidos = this.pedidos.filter(item => {
        return item.contato.razaoSocial.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      //this.getTodos();
    }
  }
}
