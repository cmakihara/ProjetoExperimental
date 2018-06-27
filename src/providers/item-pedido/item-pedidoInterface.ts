import { PedidoInterface } from "../pedido/pedidoInterface";
import { ProdutoInterface } from "../produto/produtoInterface";

export class ItemPedidoInterface {

  constructor(
    public produto?: ProdutoInterface,
    public quantidade?: number,
    public pedido?: PedidoInterface,
  ) { }

}
