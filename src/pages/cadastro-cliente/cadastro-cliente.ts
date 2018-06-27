import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { ClienteInterface } from '../../providers/cliente/clienteInterface';

import { ClienteProvider } from '../../providers/cliente/cliente';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {
  public n: number = 0;
  public clienteForm: any;

  errorRazaoSocial = false;
  errorNomeFantasia = false;
  errorCnpj = false;
  errorTelefone1 = false;
  errorTelefone2 = false;
  errorEmail = false;
  errorCep = false;
  errorLogradouro = false;
  errorNumero = false;
  errorBairro = false;
  errorLocalidade = false;
  errorUf = false;
  errorComplemento = false;
  errorObservacao = false;

  messageRazaoSocial = '';
  messageNomeFantasia = '';
  messageCnpj = '';
  messageTelefone1 = '';
  messageTelefone2 = '';
  messageEmail = '';
  messageCep = '';
  messageLogradouro = '';
  messageNumero = '';
  messageBairro = '';
  messageLocalidade = '';
  messageUf = '';
  messageComplemento = '';
  messageObservacao = '';


  /* Cliente */
  public clientes: ClienteInterface[] = [];
  public razaoSocial = '';
  public nomeFantasia = '';
  public cnpj = '';
  public telefone1 = '';
  public telefone2 = '';
  public email = '';

  /* Endereço */
  public logradouro = '';
  public numero = '';
  public bairro = '';
  public cep = '';
  public complemento = '';
  public observacao = '';
  public localidade = '';
  public uf = '';


  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public clienteProvider: ClienteProvider, public toastCtrl: ToastController) {
    this.clienteForm = formBuilder.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', Validators.required],
      telefone1: ['', Validators.compose([Validators.minLength(14), Validators.maxLength(14), Validators.required])],
      telefone2: ['', Validators.compose([Validators.minLength(15), Validators.maxLength(15)])],
      email: ['', Validators.required],
      cep: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.minLength(2)],
      uf: ['', Validators.required],
      complemento: ['', Validators.minLength(5)],
      observacao: ['', Validators.minLength(3)]
    })
  }

  ionViewDidLoad() {

  }

  public salvou(): void {
    this.n = 1;
    this.salvarAgenda();
  }

  public salvouContinuou(): void {
    this.n = 2;
    this.salvarAgenda();
  }
  public buscaCep(cep) {
    this.clienteProvider.addPedido(cep)
      .subscribe((res) => {        
        this.bairro = res.bairro,
          this.localidade = res.localidade,
          this.complemento = res.complemento,
          this.uf = res.uf,
          // this.ibge = res.ibge,
          this.logradouro = res.logradouro

      },
        err => {
          console.log(err);
        });

  }

  public salvarAgenda(): void {     //  salva cadastro cliente
    let {
      razaoSocial, nomeFantasia, cnpj, telefone1, telefone2, email, cep, logradouro, numero, bairro, localidade, complemento, observacao, uf
    } = this.clienteForm.controls;

    if (!this.clienteForm.valid) {

      if (!razaoSocial.valid) {
        this.errorRazaoSocial = true;
        this.messageRazaoSocial = 'Rasão Social não pode ficar vazio';
      } else {
        this.messageRazaoSocial = '';
      }

      if (!nomeFantasia.valid) {
        this.errorNomeFantasia = true;
        this.messageNomeFantasia = 'Nome Fantasia não pode ficar vazio';
      } else {
        this.messageNomeFantasia = '';
      }

      if (!cnpj.valid) {
        this.errorCnpj = true;
        this.messageCnpj = 'CNPJ minimo 11 - Maximo 14';
      } else {
        this.messageCnpj = '';
      }

      if (!telefone1.valid) {
        this.errorTelefone1 = true;
        this.messageTelefone1 = 'Numero de Telefone é inválido';
      } else {
        this.messageTelefone1 = '';
      }

      if (!telefone2.valid) {
        this.errorTelefone2 = true;
        this.messageTelefone2 = 'Numero do Celular é inválido';
      } else {
        this.messageTelefone2 = '';
      }

      if (!email.valid) {
        this.errorEmail = true;
        this.messageEmail = 'Email não pode ficar vazio';
      } else {
        this.messageEmail = '';
      }

      if (!cep.valid) {
        this.errorCep = true;
        this.messageCep = 'CEP deve ter 8 Digitos';
      } else {
        this.messageCep = '';
      }

      if (!logradouro.valid) {
        this.errorLogradouro = true;
        this.messageLogradouro = 'Rua não pode ficar vazio';
      } else {
        this.messageLogradouro = '';
      }

      if (!numero.valid) {
        this.errorNumero = true;
        this.messageNumero = 'Numero não pode ficar vazio';
      } else {
        this.messageNumero = '';
      }

      if (!bairro.valid) {
        this.errorBairro = true;
        this.messageBairro = 'Bairro não pode ficar vazio';
      } else {
        this.messageBairro = '';
      }

      if (!localidade.valid) {
        this.errorLocalidade = true;
        this.messageLocalidade = 'Cidade não pode ficar vazio';
      } else {
        this.messageLocalidade = '';
      }

      if (!uf.valid) {
        this.errorUf = true;
        this.messageUf = 'Estado não pode ficar vazio';
      } else {
        this.messageUf = '';
      }

      if (!complemento.valid) {
        this.errorComplemento = true;
        this.messageComplemento = 'Tamanho Minimo: 5';
      } else {
        this.messageComplemento = '';
      }

      if (!observacao.valid) {
        this.errorObservacao = true;
        this.messageObservacao = 'Tamanho Minimo: 5';
      } else {
        this.messageObservacao = '';
      }

    } else {

      const cliente = new ClienteInterface();
      cliente.razaoSocial = this.razaoSocial;
      cliente.nomeFantasia = this.nomeFantasia;
      cliente.cnpj = this.cnpj;
      cliente.telefone1 = this.telefone1;
      cliente.telefone2 = this.telefone2;
      cliente.email = this.email;
      cliente.logradouro = this.logradouro;
      cliente.numero = this.numero;
      cliente.bairro = this.bairro;
      cliente.cep = this.cep;
      cliente.localidade = this.localidade;
      cliente.uf = this.uf;
      cliente.complemento = this.complemento;
      cliente.observacao = this.observacao;

      this.clienteProvider.addCliente(cliente)
        .then((result: any) => {
        },
          err => {
            console.log(err);
          });
      let toast = this.toastCtrl.create({
        message: 'Cliente salvo com sucesso.',
        duration: 3000,
        position: 'bottom'
      });
      if (this.n === 1) {
        toast.present(toast);
        this.navCtrl.setRoot(HomePage);
      } else {
        this.navCtrl.setRoot(CadastroClientePage);
      }
      toast.present(toast);
    }
  }
}
