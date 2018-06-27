import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-grafico-cliente',
  templateUrl: 'grafico-cliente.html',
})
export class GraficoClientePage {

  @ViewChild(Nav) nav: Nav;
  @ViewChild('chartCanvas') chartCanvas;

  errorMessage: any;
  chartVar: any;
  pedidoConfirmado = 0;
  orcamento = 0;
  fat = 25863;
  abrir: boolean = false;

  public pedidos: PedidoInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public usuarioService: UsuarioProvider,
    public pedidoProvider: PedidoProvider) {
  }

  ionViewDidLoad() {
  }

  closeModal() {                  // fechar modal
    this.view.dismiss();
  }

  grafico() {
    this.getPedidos();
    this.pedidoConfirmado = 0;
    this.orcamento = 0;
    this.abrir = true;

    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].confirmado == true) {
        this.pedidoConfirmado += this.pedidos[i].valor_total;
      }
      else {
        this.orcamento += this.pedidos[i].valor_total;
      }
    }
    this.showChart();
  }


  showChart() {
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [50000.00, 500, 25000],
          backgroundColor: [
            'rgba(41, 255, 122, 1)',
            'rgba(255, 148, 12, 1)',
            'rgba(255, 148, 186, 1)'
          ]
        }],
        labels: [
          'Meta', 'Vendas', 'Orçamentos'
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          // display     : true,
          boxWidth: 80,
          fontSize: 15,
          padding: 0
        },
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10000.00,
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

  public getPedidos(): void {    //  busca todos os cientes cadastrados    
    this.pedidoProvider
      .getPedidos()
      .subscribe(
        pedidos => (this.pedidos = pedidos),
        error => (this.errorMessage = <any>error)
      );
  }

}
