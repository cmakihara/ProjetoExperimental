import { PedidoInterface } from './../../providers/pedido/pedidoInterface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading, Modal } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-pedidos-confirmados',
  templateUrl: 'pedidos-confirmados.html',
})
export class PedidosConfirmadosPage {
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

    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 2000
    });

    this.loading.present();
    this.getPedidos()
  }

  ionViewDidLoad() {
  }
  abrirModalPedido(id_pedido: number) {
    const myModal: Modal = this.modal.create("ModalPedidoPage", {
      id: id_pedido
    });
    myModal.present();
  }

  public getPedidos(): void {    //  busca todos os pedidos cadastrados
    this.pedidoProvider
      .getPedidosOk()
      .subscribe(
        pedidos => (this.pedidos = pedidos),
        error => (this.errorMessage = <any>error)
      );
  }
 
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
     
    }
  }
}
