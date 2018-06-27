import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ItemPedidoInterface } from '../../providers/item-pedido/item-pedidoInterface';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ItemPedidoProvider } from '../../providers/item-pedido/item-pedido';

/**
 * Generated class for the ModalPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-pedido',
  templateUrl: 'modal-pedido.html',
})
export class ModalPedidoPage {
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



  closeModal() { // fechar modal
    this.view.dismiss();
  
  }

}