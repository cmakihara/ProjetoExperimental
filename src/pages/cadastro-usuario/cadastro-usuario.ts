import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';

import { UsuarioInterface } from '../../providers/usuario/usuarioInterface';

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  public usuarioForm: any;

  public usuario = new UsuarioInterface();

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public usuarioProvider: UsuarioProvider, private _alertCtrl: AlertController) {
    this.usuarioForm = formBuilder.group({
      id_usuario: [''],
      nome_usuario: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      admin: ['', Validators.required],
      /* validações campos do cadastro usuário */
    })
  }

  ionViewDidLoad() {

  }

  public resetForm(): void {    //  alerta de cadastro efetuado com sucesso  ****** manda devolta para o home verificar algo melhor
    this._alertCtrl.create({
      title: 'Cadastro salvo com sucesso',
      buttons: [
        { text: 'Ok' },
      ]
    })
      .present();
    this.navCtrl.setRoot(HomePage);
  }


  public salvarUsuario(): void {     //  salva cadastro Usuario

    this.usuarioProvider.addUsuario(this.usuario)
      .then((result: any) => {
      },
        err => {
          console.log(err);
        });
  }

}

