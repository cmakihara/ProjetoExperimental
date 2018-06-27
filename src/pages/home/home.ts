import { PedidosConfirmadosPage } from './../pedidos-confirmados/pedidos-confirmados';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Nav, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { VendaPage } from '../venda/venda';
import { CadastroClientePage } from '../cadastro-cliente/cadastro-cliente';
import { BuscarClientePage } from '../buscar-cliente/buscar-cliente';
import { CadastroProdutoPage } from '../cadastro-produto/cadastro-produto';
import { BuscarProdutoPage } from '../buscar-produto/buscar-produto';
import { ListOrcamentoPage } from '../list-orcamento/list-orcamento';
import { BuscaUsuarioPage } from '../busca-usuario/busca-usuario';

import { LoginProvider } from '../../providers/login-provider/login-provider';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';

import { Chart } from 'chart.js';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { ConfiguracaoPage } from '../configuracao/configuracao';

export interface PageMenu {
  title: string;
  component: any;
  icon?: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  teste = '2018-06'

  public usuario = {
    usuario: localStorage.getItem("usuarioLogado"), 
    senha: localStorage.getItem("usuario_senha")
  }

  public event = {
    month: this.teste,  
  }

  vlr: any;
  errorMessage: any;
  @ViewChild(Nav) nav: Nav;
  @ViewChild('chartCanvas') chartCanvas;
  public nomeUsuario = localStorage.getItem("usuarioLogado");

  public pages: PageMenu[];
  rootPage: any = LoginPage;
  pedidoConfirmado =0;
  orcamento =0;
  fat = 25863
  public habil = localStorage.getItem("usuario_admin");

  dopes: number;  
  chartVar: any;
  abrir: boolean = false;
  
  public pedidos: PedidoInterface[] = [];
  
  constructor(
    public navCtrl: NavController,
    private loginService: LoginProvider,
    public alertCtrl: AlertController,
    public usuarioService: UsuarioProvider,
    public pedidoProvider: PedidoProvider  
  ) {
    this.pages = [

      { title: 'Cadastrar Cliente', component: CadastroClientePage, icon: 'person-add' },
      { title: 'Buscar Cliente', component: BuscarClientePage, icon: 'person' },
      { title: 'Cadastrar Produto', component: CadastroProdutoPage, icon: 'add' },
      { title: 'Buscar Produto', component: BuscarProdutoPage, icon: 'list' },
      { title: 'Venda', component: VendaPage, icon: 'cart' },
      { title: 'Orçamento', component: ListOrcamentoPage, icon: 'clipboard' },
      { title: 'Pedidos Confirmados', component: PedidosConfirmadosPage, icon: 'done-all' },
      { title: 'Cadastrar Usuario', component: CadastroUsuarioPage, icon: 'person-add' },
      { title: 'Buscar Usuario', component: BuscaUsuarioPage, icon: 'man' },
      { title: 'Configurações', component: ConfiguracaoPage, icon: 'settings' }
    ];
    this.getPedidos();    
  }

  ngOnInit(): void {
    let user;
    this.usuarioService.login(this.usuario).subscribe((res) => {
      user = res;
    });
    
    this.loginService.setUsuario(user);

  }

  ionViewWillEnter() {   
    this.grafico()
  }
  grafico() {   
    this.getPedidos();  
    this.pedidoConfirmado =0;
    this.orcamento =0;
    this.abrir = true;
    
    for (let i = 0; i < this.pedidos.length; i++) {
      if(this.pedidos[i].confirmado == true){
        this.pedidoConfirmado += this.pedidos[i].valor_total;
      }
      else{
        this.orcamento += this.pedidos[i].valor_total;
      }
    }
    this.showChart();
  }

  showChart() {    
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {        
        datasets: [{
          data: [50000.00, this.pedidoConfirmado ,this.orcamento],
          backgroundColor: [
            'rgba(41, 255, 122, 1)',
            'rgba(255, 148, 12, 1)',
            'rgba(255, 148, 186, 1)'
          ]         
        }],
        labels: [
          'Meta','Vendas','Orçamentos'          
        ]
      },     
      options: {
        maintainAspectRatio: false,
         legend         : {
            display     : false,
            boxWidth    : 80,
            fontSize    : 15,
            padding     : 0
         },
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              stepSize:5000.00,
            }
          }],
          xAxes: [{
             ticks: {
                autoSkip: false
             }
          }]
       }  
       }
    })
  }

  public logout(): void {
    // Invalidar token
    //this.loginService.removeUsuario();
    //this.nav.setRoot(LoginPage);
    
    let alert = this.alertCtrl.create({
      title: 'Sair',
      subTitle: 'Deseja deslogar',
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.loginService.removeUsuario();
            this.navCtrl.setRoot(LoginPage);
            this.navCtrl.popToRoot();
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

  public getPedidos(): void {    //  busca todos os cientes cadastrados    
    this.pedidoProvider
      .getPedidos()
      .subscribe(
        pedidos => (this.pedidos = pedidos),
        error => (this.errorMessage = <any>error)        
      );
  }
 
  openPage(page: PageMenu) {
    if (page.component === HomePage) {
    }
    this.navCtrl.push(page.component);
  }

  cadCliente() {
    this.navCtrl.push('CadastroClientePage');
  }
  buscaClienteTodos() {
    this.navCtrl.push('BuscarClientePage');
  }
  cadProduto() {
    this.navCtrl.push('CadastroProdutoPage');
  }
  buscaProduto() {
    this.navCtrl.push('BuscarProdutoPage');
  }
  venda() {
    this.navCtrl.push('VendaPage');
  }
  cadUsuario() {
    this.navCtrl.push('CadastroUsuarioPage');
  }
  listOrcamento() {
    this.navCtrl.push('ListOrcamentoPage');
  }
  buscaUsuario() {
    this.navCtrl.push('BuscaUsuarioPage');
  }
}
  

