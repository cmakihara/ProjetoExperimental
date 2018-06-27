import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ItemPedidoProvider } from '../../providers/item-pedido/item-pedido';
import { ItemPedidoInterface } from '../../providers/item-pedido/item-pedidoInterface';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';



@IonicPage()
@Component({
  selector: 'page-modal-orcamento',
  templateUrl: 'modal-orcamento.html',
})
export class ModalOrcamentoPage {
  errorMessage: any;
  id = this.navParams.get('id');
  public itemPedidos: ItemPedidoInterface[] = [];
  public pedidos: PedidoInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    public itemPedidoProvider: ItemPedidoProvider,
    public pedidoProvider: PedidoProvider) {

      this.buscaItemPedido(this.id);
      this.buscaPedido(this.id);

  }

  ionViewWillEnter() {

  }
  public buscaItemPedido(id_pedido){
    this.itemPedidoProvider
    .getItensPedido(id_pedido)
    .subscribe(
      itemPedidos => (this.itemPedidos = itemPedidos),
      error => (this.errorMessage = <any>error)
    );

  }

  public buscaPedido(id_pedido: number): void {
    this.pedidoProvider.getPedidoById(id_pedido)
      .subscribe(
        pedidos => this.pedidos = pedidos,
        error => this.errorMessage = <any>error);

  }

  public enviarEmail() {
    this.pedidoProvider.enviarEmailCliente(this.itemPedidos).subscribe();
    console.log('teste');
  }

  public confirmarPedido() {
    this.pedidoProvider.confirmarPedido(this.id).subscribe();
    this.closeModal();
  }



  closeModal() { // fechar modal
    this.view.dismiss();
  }

}
