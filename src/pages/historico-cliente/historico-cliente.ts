import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ModalController, LoadingController, ViewController } from 'ionic-angular';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';
import { PedidoProvider } from '../../providers/pedido/pedido';

/**
 * Generated class for the HistoricoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-cliente',
  templateUrl: 'historico-cliente.html',
})
export class HistoricoClientePage {
  errorMessage: any;
  public loading: Loading;
  public pedidos: PedidoInterface[] = [];

  id = this.navParams.get('id')

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoProvider: PedidoProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    private view: ViewController
  ) {


  }

  ionViewWillEnter() {
    this.getHistorico(this.id);
    console.log(this.pedidos);
  }

  closeModal() { // fechar modal
    this.view.dismiss();
  }

  public getHistorico(id_contato){
    this.pedidoProvider
    .getHistorico(id_contato)
    .subscribe(
      pedidos => (this.pedidos = pedidos),
      error => (this.errorMessage = <any>error)
    );

  }



}
