import { Component } from '@angular/core';
import { IonicPage, Modal, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

import { ClienteInterface } from '../../providers/cliente/clienteInterface';
import { ProdutoInterface } from '../../providers/produto/produtoInterface';
import { ItemPedidoInterface } from '../../providers/item-pedido/item-pedidoInterface';
import { PedidoInterface } from '../../providers/pedido/pedidoInterface';

import { ProdutoProvider } from '../../providers/produto/produto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ItemPedidoProvider } from '../../providers/item-pedido/item-pedido';


@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {
  listaQuantidade = [];
  errorMessage: any;
  public clientes: ClienteInterface[] = [];
  public produtos: ProdutoInterface[] = [];

  public pedidos: PedidoInterface[] = [];
  public id_pedido = 0;
  public id_usuario = 0;
  public id_cliente = 0;
  public confirmado = false;
  public qtdProduto = 0;
  public pedido: 0;
  public contadorProduto = 0;
  public totala = 0
  public total = 0
  public clienteId: any;
  abrir: boolean = false;
  abrir2: boolean = false;
  public pessoa= localStorage.getItem("id_usuario")
  quantidade: any = 1;

  public itempedidos: ItemPedidoInterface[] = [];
  public listaProduto: ProdutoInterface[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modal: ModalController,
    public clienteProvider: ClienteProvider,
    public view: ViewController,
    public produtoProvider: ProdutoProvider,
    public pedidoProvider: PedidoProvider,
    public itemPedidoProvider: ItemPedidoProvider,
  ) {
  }

  ionViewDidLoad() {

  }

  abrirModalCliente() {    // abre modal para selecionar cliente para venda
    const myModal: Modal = this.modal.create('ModalClientePage');
    myModal.present();

    myModal.onDidDismiss((id_contato) => {  //recebe o id do cliente selecionado
      if (id_contato == null) {

      } else {
        this.buscaClienteId(id_contato);
        this.abrir = true;

      }
    })
  }

  abrirModalProduto() {    // abre modal para selecionar produto para venda
    const myModal: Modal = this.modal.create('ModalProdutoPage');
    myModal.present();

    myModal.onDidDismiss((data) => { //recebe o id do produto e a quantidade selecionada
      if (data == undefined) {

      }
      else {
        this.buscaProdutoId(data);
        this.abrir2 = true;
      }
    })
  }

  public buscaClienteId(id_contato: number): void {    // metodo para busca do cliente selecionado
    this.clienteProvider.getClienteById(id_contato)
      .subscribe(res => {
        this.clientes = res;
        this.clienteId = id_contato;
      },
        err => {
          console.log(err);
        });
  }

  public buscaProdutoId(data) {       // metodo para busca do produto selecionado
    this.produtoProvider.getProdutoById(data.id_produto)
      .subscribe(res => {
        this.produtos = res;
        this.listaProdutos(this.produtos, data.qtd);
      },
        err => {
          console.log(err);
        });
  }

  public listaProdutos(produtos, quantidade): void {
    this.contadorProduto += 1;
    this.listaProduto.push(produtos);
    this.listaQuantidade.push(quantidade);
    this.totala = 0;
    this.qtdProduto = 0;

    for (let i = 0; i < this.listaProduto.length; i++) {
      this.totala += parseFloat(this.listaProduto[i].valor) * this.listaQuantidade[i];
      this.total = parseFloat(this.totala.toFixed(2))
    }

  }

  public salvarOrcamento(): void {     // salva Orcamento
    const pedido = new PedidoInterface();
    pedido.usuario = {
      id_usuario:  parseInt(this.pessoa), //Inserir id_usuario aqui
    };
    pedido.contato = {
      id_contato: this.clienteId,
    };
    pedido.data = new Date;
    pedido.confirmado = false;
    pedido.valor_total = this.total;

    this.pedidoProvider.addPedido(pedido)
      .subscribe((res) => {
        this.salvarItempedido(res.id_pedido)
      },
        err => {
          console.log(err);
        });
    this.navCtrl.pop();
  }

  public salvarPedido(): void {     // salva Pedido
    const pedido = new PedidoInterface();
    pedido.usuario = {
      id_usuario:  parseInt(this.pessoa), //Inserir id_usuario aqui
    };
    pedido.contato = {
      id_contato: this.clienteId,
    };
    pedido.data = new Date;
    pedido.confirmado = true;
    pedido.valor_total = this.total;

    this.pedidoProvider.addPedido(pedido)
      .subscribe((res) => {
        this.salvarItempedido(res.id_pedido)
      },
        err => {
          console.log(err);
        });
        this.navCtrl.pop();
  }


  public salvarItempedido(id_pedido): void {  //  Salva itens do pedido

    for (let i = 0; i < this.listaProduto.length; i++) {
      const itemPedido = new ItemPedidoInterface();

      itemPedido.produto = {
        id_produto: this.listaProduto[i].id_produto
      }
      itemPedido.quantidade = this.listaQuantidade[i];

      itemPedido.pedido = {
        id_pedido: id_pedido
      }
      this.itemPedidoProvider.addItemPedido(itemPedido)
        .then((result: any) => {
        },
          err => {
            console.log(err);
          });
    }
  }
}
