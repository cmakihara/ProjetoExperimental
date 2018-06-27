import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Modal } from 'ionic-angular';
import { UsuarioInterface } from '../../providers/usuario/usuarioInterface';
import { UsuarioProvider } from '../../providers/usuario/usuario';




@IonicPage()
@Component({
  selector: 'page-busca-usuario',
  templateUrl: 'busca-usuario.html',
})
export class BuscaUsuarioPage {

  errorMessage: any;

  public usuarios: UsuarioInterface[] = [];
  public novalista: UsuarioInterface[] = [];

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioProvider: UsuarioProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController

  ) {
    this.getTodos();
  }

  ionViewDidLoad() {
  console.log(localStorage.getItem("id_usuario"))
  }

  abrirModalDadosUsuario(id_usuario: number) {
    const myModal: Modal = this.modal.create("ModalDadosUsuarioPage", {
      id: id_usuario
    });
    myModal.present();
    myModal.onDidDismiss(res => {
      this.getTodos();
    });
  }

  public getTodos(): void {
    this.usuarioProvider.getUsuarios()
      .subscribe(
        usuarios => (this.usuarios = usuarios),
        error => (this.errorMessage = <any>error)
      );
  }

  public getBusca(ev) {

    var val = ev.target.value;

    if (this.usuarios.length > this.novalista.length) {
      this.novalista = this.usuarios;
    } else {
      this.usuarios = this.novalista;
    }

    if (val && val.trim() != "") {
      this.usuarios = this.usuarios.filter(item => {
        return item.usuario.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.getTodos();
    }
  }
}


