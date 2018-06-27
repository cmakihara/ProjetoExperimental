import { Component } from '@angular/core';
import { IonicPage, NavParams, Nav } from 'ionic-angular';

import { HomePage } from '../home/home';

import { UsuarioInterface } from '../../providers/usuario/usuarioInterface';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginProvider } from '../../providers/login-provider/login-provider';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usuario = '';
  public senha = '';

  constructor(
    public nav: Nav,
    public navParams: NavParams,
    public UsuarioProvider: UsuarioProvider,
    public loginService: LoginProvider) {
  }

  ionViewDidLoad() {   
  }

  public logar() {
    const usuario = new UsuarioInterface();
    usuario.usuario = this.usuario;
    usuario.senha = this.senha;

    this.UsuarioProvider.login(usuario).subscribe((result: any) => {
      if (result.usuario === null) {
     
      } else {
        this.loginService.setUsuario(result);
        this.nav.setRoot(HomePage);     
      }
    },
      (error) => {
      });
  }

}
