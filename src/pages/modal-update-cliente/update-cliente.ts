import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ClienteInterface } from '../../providers/cliente/clienteInterface';
import { ClienteProvider } from '../../providers/cliente/cliente';


@IonicPage()
@Component({
  selector: 'page-update-cliente',
  templateUrl: 'update-cliente.html',
})
export class UpdateClientePage {
  errorMessage: any;
  /* Cliente */
  public clientes: ClienteInterface[] = [];
  public razaoSocial  = '';
  public nomeFantasia = '';
  public cnpj         = '';
  public telefone1    = '';
  public telefone2    = '';
  public email        = '';
  public nome_dono    = '';
  public nome_compra  = '';
  /* Endereço */
  public logradouro   = '';
  public numero       = '';
  public bairro       = '';
  public cep          = '';
  public localidade   = '';
  public uf           = '';
  public complemento  = '';
  public observacao   = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteProvider: ClienteProvider,
    private view: ViewController) {
  }

  ionViewWillLoad() {                 // quando carregar chama o getUm e busca o cliente selecionado
    const id = this.navParams.get('id')
    this.buscaClienteId(id);
  }

  public buscaClienteId(id_contato: number): void {    //  busca todos os cientes cadastrados   
    this.clienteProvider.getClienteById(id_contato)
      .subscribe(
        clientes => this.clientes = clientes,
        error => this.errorMessage = <any>error);
  }

  public atualizarContato(id_contato: number): void {    // fazer update de cliente por id
    this.clienteProvider.updateAgenda(id_contato, this.clientes)
      .then((result: any) => {
      },
        err => {
          console.log(err);
        });
    this.view.dismiss(this.buscaClienteId(id_contato));
  }

  closeModal() { // fechar modal
    this.view.dismiss();
  }
}