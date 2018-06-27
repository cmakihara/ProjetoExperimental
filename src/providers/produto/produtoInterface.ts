export class ProdutoInterface {

    constructor(
        public id_produto?: number,
        public nomeproduto?: string,
        public descricao?: string,
        public medida?: string,
        public qtdMinima?: string,
        public valor?: string,
        public codigoBarra?: string,
        public categoria?: string, ) { }

}
