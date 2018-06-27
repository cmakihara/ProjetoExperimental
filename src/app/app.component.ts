import { HomePage } from './../pages/home/home';
import { AthorizationService } from './../providers/notifier/authorization.provider';
import { Component, ViewChild, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';


import { LoginProvider } from '../providers/login-provider/login-provider';

// import { AuthenticationNotifierService } from './../notificador/authentication.notifier';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  public usuarioLogado: string = "";
  private usuario: string;
  public navCtrl: NavController;
  @ViewChild(Nav) nav: Nav;

  ngOnInit() {
    this.platform.ready().then(() => {
      this.usuario = this.loginService.getUsuario();
      if (this.usuario) {
        this.usuarioLogado = this.usuario;
        this.nav.setRoot(HomePage);
      }
      else {
        this.nav.setRoot(LoginPage);
      }
    })
  }
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private athorizationService: AthorizationService,
    private loginService: LoginProvider,
    public alertCtrl: AlertController
  ) {

    // this.rootPage = LoginPage;


    this.initializeApp();

    this.athorizationService
      .listen()
      .subscribe(() => {
        this.nav.setRoot(LoginPage);
      });

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  public logout(): void {
    // Invalidar token
    //this.loginService.removeUsuario();
    //this.nav.setRoot(LoginPage);
    console.log("rtere");
    let alert = this.alertCtrl.create({
      title: 'Sair',
      subTitle: 'Deseja deslogar',
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.loginService.removeUsuario();
            this.nav.setRoot(LoginPage);
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
}
