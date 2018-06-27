import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Modal, ModalController, LoadingController, Loading } from "ionic-angular";

import { ClienteInterface } from "../../providers/cliente/clienteInterface";
import { ClienteProvider } from "../../providers/cliente/cliente";

@IonicPage()
@Component({
  selector: "page-buscar-cliente",
  templateUrl: "buscar-cliente.html"
})
export class BuscarClientePage {
  errorMessage: any;
  public loading: Loading;
  public clientes: ClienteInterface[] = [];
  public novalista: ClienteInterface[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteProvider: ClienteProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController
  ) {

    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 2000
    });
    this.getTodos();
    this.loading.present();
  }

  ionViewDidLoad() {

  }

  abrirModalDadosCliente(id_contato: number) {    // abre modal com os dados do cliente selecionado
    const myModal: Modal = this.modal.create("ModalDadosClientePage", {
      id: id_contato
    });
    myModal.present();
    myModal.onDidDismiss(res => {
      this.getTodos();
    });
  }

  public getTodos(): void {    //  busca todos os cientes cadastrados
    this.clienteProvider
      .getClientes()
      .subscribe(
        clientes => (this.clientes = clientes),
        error => (this.errorMessage = <any>error)
      );
  }

  public getBusca(ev) {    //  busca pelo nome digitado

    var val = ev.target.value;

    if (this.clientes.length > this.novalista.length) {
      this.novalista = this.clientes;
    } else {
      this.clientes = this.novalista;
    }

    if (val && val.trim() != "") {
      this.clientes = this.clientes.filter(item => {
        return item.nomeFantasia.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.getTodos();
    }
  }
}
