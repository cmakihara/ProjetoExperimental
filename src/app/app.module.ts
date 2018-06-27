import { PedidosConfirmadosPageModule } from './../pages/pedidos-confirmados/pedidos-confirmados.module';
import { ListOrcamentoPageModule } from './../pages/list-orcamento/list-orcamento.module';
import { LoginPageModule } from './../pages/login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AthorizationService } from '../providers/notifier/authorization.provider';
import { MyHttpInterceptor } from './../interceptors/autenticacao.interceptor';

import { ProdutoProvider } from '../providers/produto/produto';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ClienteProvider } from './../providers/cliente/cliente';
import { LoginProvider } from './../providers/login-provider/login-provider';

import { BuscarClientePageModule } from './../pages/buscar-cliente/buscar-cliente.module';
import { BuscaUsuarioPageModule } from './../pages/busca-usuario/busca-usuario.module';
import { CadastroClientePageModule } from './../pages/cadastro-cliente/cadastro-cliente.module';
import { CadastroProdutoPageModule } from './../pages/cadastro-produto/cadastro-produto.module';
import { HomePageModule } from './../pages/home/home.module';
import { ModalClientePageModule } from './../pages/modal-venda-cliente/modal-cliente.module';
import { UpdateClientePageModule } from './../pages/modal-update-cliente/update-cliente.module';
import { VendaPageModule } from './../pages/venda/venda.module';
import { BuscarProdutoPageModule } from '../pages/buscar-produto/buscar-produto.module';
import { PedidoProvider } from '../providers/pedido/pedido';
import { ItemPedidoProvider } from '../providers/item-pedido/item-pedido';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CadastroUsuarioPageModule } from '../pages/cadastro-usuario/cadastro-usuario.module';
import { ConfiguracaoPageModule } from '../pages/configuracao/configuracao.module';


const components = [
  MyApp
];

const modulos = [
  CadastroUsuarioPageModule,
  BuscarClientePageModule,
  BuscarProdutoPageModule,
  BuscaUsuarioPageModule,
  CadastroClientePageModule,
  CadastroProdutoPageModule,
  HomePageModule,
  LoginPageModule,
  ModalClientePageModule,
  UpdateClientePageModule,
  VendaPageModule,
  ListOrcamentoPageModule,
  PedidosConfirmadosPageModule,
  ConfiguracaoPageModule
];

@NgModule({
  declarations: components,
  imports: [
    
    BrowserModule,
    HttpClientModule,
    HttpModule,    
    IonicModule.forRoot(MyApp),
    ChartsModule,
    ...modulos
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ClienteProvider,
    ProdutoProvider,
    UsuarioProvider,
    LoginProvider,

    AthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    PedidoProvider,
    ItemPedidoProvider,
  ]
})
export class AppModule { }
