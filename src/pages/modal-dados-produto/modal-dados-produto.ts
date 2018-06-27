import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Modal, ToastController, AlertController } from 'ionic-angular';

import { ProdutoInterface } from '../../providers/produto/produtointerface';
import { ProdutoProvider } from '../../providers/produto/produto';


@IonicPage()
@Component({
  selector: 'page-modal-dados-produto',
  templateUrl: 'modal-dados-produto.html',
})
export class ModalDadosProdutoPage {

  public id: any;

  errorMessage: any;
  public produtos: ProdutoInterface[] = [];
  public novalista: ProdutoInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoProvider: ProdutoProvider,
    public alertCtrl: AlertController,
    private view: ViewController,
    public modal: ModalController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.buscaProdutoId(this.id);
  }

  abrirModalAtualizar(id_produto: number) {
    const myModal: Modal = this.modal.create('ModalUpdateProdutoPage', { id: id_produto });
    myModal.present();
    myModal.onDidDismiss(res => {
      this.buscaProdutoId(this.id);
    })
  }

  public deletarProduto(id_produto: number) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Remover produto?',
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.produtoProvider.removeProduto(id_produto);
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

  closeModal() {    // fechar modal
    this.view.dismiss();
  }

  public buscaProdutoId(id_produto: number): void {
    this.produtoProvider.getProdutoById(this.id)
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage = <any>error);
  }

}
