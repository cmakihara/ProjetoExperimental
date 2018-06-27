import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { ProdutoInterface } from '../../providers/produto/produtoInterface';

import { ProdutoProvider } from '../../providers/produto/produto';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-cadastro-produto',
  templateUrl: 'cadastro-produto.html',
})
export class CadastroProdutoPage {

  public produtoForm: any;

  valida = 0;

  messageNomeproduto = '';
  messageDescricao   = '';
  messageMedida      = '';
  messageQtdMinima   = '';
  messageValor       = '';
  messageCodigoBarra = '';
  messageCategoria   = '';

  errorNomeproduto = false;
  errorDescricao   = false;
  errorMedida      = false;
  errorQtdMinima   = false;
  errorValor       = false;
  errorCodigoBarra = false;
  errorCategoria   = false;

  public produtos: ProdutoInterface[] = [];
  public nomeproduto = '';
  public descricao   = '';
  public medida      = '';
  public qtdMinima   = '';
  public valor       = '';
  public codigoBarra = '';
  public categoria   = '';

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private produtoProvider: ProdutoProvider, public toastCtrl: ToastController) {
    this.produtoForm = formBuilder.group({
      nomeproduto: ['', Validators.required],
      descricao:   ['', Validators.required],
      medida:      ['', Validators.required],
      qtdMinima:   ['', Validators.required],
      valor:       ['', Validators.required],
      codigoBarra: ['', Validators.compose([Validators.minLength(13), Validators.maxLength(13), Validators.required])],
      categoria:   ['', Validators.minLength(1)]

    })
  }

  public sair(): void {
    this.valida = 1;
    this.salvarProduto();
  }
  public continua(): void {
    this.valida = 2;
    this.salvarProduto();
  }

  public confirmacaoCadastro(): void {      //  toast de cadastro efetuado com sucesso, necessario um reload da pagina

    let toast = this.toastCtrl.create({
      message: 'Produto salvo com sucesso.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present(toast);
    this.navCtrl.setRoot(CadastroProdutoPage);
  }
  public confirCadastro(): void {      //  toast de cadastro efetuado com sucesso, necessario um reload da pagina
    let toast = this.toastCtrl.create({
      message: 'Produto salvo com sucesso.',
      duration: 3000,
      position: 'bottom'
    });

    toast.present(toast);
    this.navCtrl.setRoot(HomePage);
  }
  public salvarProduto(): void {    //  salva cadastro de produto

    let {
      nomeproduto, descricao, medida, qtdMinima, valor, codigoBarra, categoria
    } = this.produtoForm.controls;


    if (!this.produtoForm.valid) {
      if (!nomeproduto.valid) {
        this.errorNomeproduto = true;
        this.messageNomeproduto = 'Não Pode ficar vazio';
      } else {
        this.messageNomeproduto = '';
      }
      if (!descricao.valid) {
        this.errorDescricao = true;
        this.messageDescricao = 'Não Pode ficar vazio';
      } else {
        this.messageDescricao = '';
      }
      if (!medida.valid) {
        this.errorMedida = true;
        this.messageMedida = 'Não Pode ficar vazio';
      } else {
        this.messageMedida = '';
      }
      if (!qtdMinima.valid) {
        this.errorQtdMinima = true;
        this.messageQtdMinima = 'Não Pode ficar vazio';
      } else {
        this.messageQtdMinima = '';
      }
      if (!valor.valid) {
        this.errorValor = true;
        this.messageValor = 'Não Pode ficar vazio';
      } else {
        this.messageValor = '';
      }
      if (!codigoBarra.valid) {
        this.errorCodigoBarra = true;
        this.messageCodigoBarra = 'Deve conter 13 digitos';
      } else {
        this.messageCodigoBarra = '';
      }
      if (!categoria.valid) {
        this.errorCategoria = true;
        this.messageCategoria = 'Dado Invalido';
      } else {
        this.messageCategoria = '';
      }

    } else {
      const produto = new ProdutoInterface();

      produto.nomeproduto = this.nomeproduto;
      produto.descricao = this.descricao;
      produto.medida = this.medida;
      produto.qtdMinima = this.qtdMinima;
      produto.valor = this.valor;
      produto.codigoBarra = this.codigoBarra;
      produto.categoria = this.categoria;

      this.produtoProvider.addProduto(produto)
        .then((result: any) => {
        },
          err => {
            console.log(err);
          });
      if (this.valida == 1) {
        this.confirCadastro();
      } else {
        this.confirmacaoCadastro();
      }
    }
  }
}
