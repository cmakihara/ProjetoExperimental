export class UsuarioInterface {

    constructor(
        public id_usuario?: number,
        public usuario?: string,
        public nome_usuario?: string,
        public admin?: boolean,
        public senha?: string,
        public inativo?: boolean
    ) {
        this.admin = false;
    }

}
