import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Modal, ToastController, AlertController } from 'ionic-angular';

import { ClienteInterface } from '../../providers/cliente/clienteInterface';
import { ClienteProvider } from '../../providers/cliente/cliente';

@IonicPage()
@Component({
  selector: 'page-modal-dados-cliente',
  templateUrl: 'modal-dados-cliente.html',
})
export class ModalDadosClientePage {

  public id: any;

  errorMessage: any;
  public clientes: ClienteInterface[] = [];
  public novalista: ClienteInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteProvider: ClienteProvider,
    public alertCtrl: AlertController,
    private view: ViewController,
    public modal: ModalController,
    public toastCtrl: ToastController) {
  }

  abrirModalHistorico(id_contato: number) {    // abre modal com o historico de compras do cliente
    const myModal: Modal = this.modal.create('HistoricoClientePage', { id: id_contato });
    myModal.present();
    myModal.onDidDismiss(res => {
     // this.buscaCliente(this.id);
    })
  }

  abrirModalAtualizar(id_contato: number) {    // abre modal para atualizar com os dados do cliente selecionado
    const myModal: Modal = this.modal.create('UpdateClientePage', { id: id_contato });
    myModal.present();
    myModal.onDidDismiss(res => {
      this.buscaCliente(this.id);
    })
  }

  public deletarCliente(id_contato: number) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Remover cliente?',
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.clienteProvider.removeCliente(id_contato);
            this.closeModal();
          }
        },
        {
          text: 'Nao',
          handler: data => {
          }
        }
      ]
    });
    alert.present();

  }

  ionViewWillLoad() {                 // quando carregar chama o getUm e busca o cliente selecionado
    this.id = this.navParams.get('id')
    this.buscaCliente(this.id);
  }

  closeModal() {                  // fechar modal
    this.view.dismiss();
  }

  public buscaCliente(id_contato: number): void {    // metodo para busca do cliente selecionado   **********nao finalizado
    this.clienteProvider.getClienteById(id_contato)
      .subscribe(
        clientes => this.clientes = clientes,
        error => this.errorMessage = <any>error);
  }
}