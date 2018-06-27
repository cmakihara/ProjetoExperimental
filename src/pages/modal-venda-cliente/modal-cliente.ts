import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ClienteInterface } from '../../providers/cliente/clienteInterface';

import { ClienteProvider } from '../../providers/cliente/cliente';

@IonicPage()
@Component({
  selector: 'page-modal-cliente',
  templateUrl: 'modal-cliente.html',
})
export class ModalClientePage {
  errorMessage: any;
  public clientes: ClienteInterface[] = [];
  public novalista: ClienteInterface[] = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteProvider: ClienteProvider,
    private view: ViewController) {

    this.buscaClientes();  //ao abrir modal mostrar todos cliente
  }

  ionViewDidLoad() {
  
  }

  closeModal() { // fechar modal
    this.view.dismiss();
  }

  public buscaClientes(): void {  //metodos para busca todos clientes
    this.clienteProvider.getClientes()
      .subscribe(
        clientes => this.clientes = clientes,
        error => this.errorMessage = <any>error);
  }

  public getBusca(ev) {   //busca por digitação
    var val = ev.target.value;

    if (this.clientes.length > this.novalista.length) {
      this.novalista = this.clientes;
    }
    else {
      this.clientes = this.novalista;
    }
    if (val && val.trim() != '') {
      this.clientes = this.clientes.filter((item) => {
        return (item.nomeFantasia.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    else {
      this.buscaClientes();
    }
  }

  public selecionarCliente(id_contato: number) {  //pegar um id do cliente selecionado
    this.view.dismiss(id_contato);
  }
}
