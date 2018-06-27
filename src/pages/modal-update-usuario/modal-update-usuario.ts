import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioInterface } from '../../providers/usuario/usuarioInterface';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-modal-update-usuario',
  templateUrl: 'modal-update-usuario.html',
})
export class ModalUpdateUsuarioPage {

  errorMessage: any;

  public usuarios: UsuarioInterface[] = [];
  public nome_usuario = '';
  public loginUsuario = '';
  public senhaUsuario = '';
  public tipoUser     = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuarioProvider: UsuarioProvider,
              private view: ViewController ) {
  }

  ionViewWillLoad() {                 // quando carregar chama o getUm e busca o usuario selecionado
    const id = this.navParams.get('id')
    this.buscaUsuarioId(id);
  }

  public buscaUsuarioId(id_usuario: number): void {    //  busca todos os usuario cadastrados   
    this.usuarioProvider.getUsuarioById(id_usuario)
      .subscribe(
        usuarios => this.usuarios = usuarios,
        error => this.errorMessage = <any>error);
  }

  public atualizarUsuario(id_usuario: number): void {    // fazer update de usuasrio por id
    this.usuarioProvider.updateUsuario(id_usuario, this.usuarios)
      .then((result: any) => {
      },
        err => {
          console.log(err);
        });
    this.view.dismiss(this.buscaUsuarioId(id_usuario));
  }

  closeModal() { // fechar modal
    this.view.dismiss();
  }

}
