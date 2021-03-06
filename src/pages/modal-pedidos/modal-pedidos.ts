import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ItemPedidoProvider } from '../../providers/item-pedido/item-pedido';
import { ItemPedidoInterface } from '../../providers/item-pedido/item-pedidoInterface';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';

@IonicPage()
@Component({
  selector: 'page-modal-pedidos',
  templateUrl: 'modal-pedidos.html',
})
export class ModalPedidosPage {
  errorMessage: any;
  id = this.navParams.get('id');

  public itemPedidos: ItemPedidoInterface[] = [];
  public pedidos: PedidoInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    public itemPedidoProvider: ItemPedidoProvider,
    public pedidoProvider: PedidoProvider) {
      this.buscaPedido(this.id);
    }

  ionViewWillEnter() {}

  public buscaPedido(id_pedido: number): void {
    this.pedidoProvider.getPedidoById(id_pedido)
      .subscribe(
        pedidos => this.pedidos = pedidos,
        error => this.errorMessage = <any>error);
  }

  closeModal() { // fechar modal
    this.view.dismiss();
  }
}
