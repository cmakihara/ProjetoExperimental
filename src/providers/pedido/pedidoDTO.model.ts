import { PedidoInterface } from "./pedidoInterface";
import { ItemPedidoInterface } from "../item-pedido/item-pedidoInterface";

export class PedidoDTO {
  constructor(
    public pedido?: PedidoInterface,
    public produtos?: ItemPedidoInterface[]
  )
  {}
}
