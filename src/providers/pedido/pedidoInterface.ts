import { UsuarioInterface } from "../usuario/usuarioInterface";
import { ClienteInterface } from "../cliente/clienteInterface";

export class PedidoInterface {

  constructor(
    public id_pedido?: number,
    public usuario?: UsuarioInterface,
    public contato?: ClienteInterface,
    public confirmado?: boolean,
    public valor_total?: number,
    public data?: Date,
    public qtdProduto?: number
  ) { }

}