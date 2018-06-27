export class ClienteInterface {

  constructor(
    public id_contato?: number,
    public razaoSocial?: string,
    public nomeFantasia?: string,
    public cnpj?: string,
    public telefone1?: string,
    public telefone2?: string,
    public email?: string,
    public logradouro?: string,
    public numero?: string,
    public bairro?: string,
    public cep?: string,
    public complemento?: string,
    public observacao?: string,
    public localidade?: string,
    public uf?: string,
    public ibge?: string,
    public inscricaoE?: string

  ) { }

}
