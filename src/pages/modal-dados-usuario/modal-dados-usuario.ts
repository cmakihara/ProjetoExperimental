import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  Modal,
  ToastController,
  AlertController
} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { UsuarioInterface } from '../../providers/usuario/usuarioInterface';

@IonicPage()
@Component({
  selector: 'page-modal-dados-usuario',
  templateUrl: 'modal-dados-usuario.html',
})
export class ModalDadosUsuarioPage {

  public id: any;

  errorMessage: any;
  public usuarios: UsuarioInterface[] = [];
  public novalista: UsuarioInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioProvider: UsuarioProvider,
    public alertCtrl: AlertController,
    private view: ViewController,
    public modal: ModalController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  abrirModalAtualizar(id_usuario: number) {    // abre modal para atualizar com os dados do cliente selecionado
    const myModal: Modal = this.modal.create('ModalUpdateUsuarioPage', { id: id_usuario });
    myModal.present();
    myModal.onDidDismiss(res => {
      this.buscaUsuario(this.id);
    })
  }

  public deletarUsuario(id_usuario: number) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Remover Usuario?',
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.usuarioProvider.removeUsuario(id_usuario);
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

  ionViewWillLoad() {
    this.id = this.navParams.get('id')
    this.buscaUsuario(this.id);
  }

  closeModal() {
    this.view.dismiss();
  }

  public buscaUsuario(id_usuario: number): void {

    this.usuarioProvider.getUsuarioById(id_usuario)
      .subscribe(
        usuarios => this.usuarios = usuarios,
        error => this.errorMessage = <any>error);
  }

}
