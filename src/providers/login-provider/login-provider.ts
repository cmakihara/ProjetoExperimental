import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../usuario/usuarioInterface';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginProvider {


  public setUsuario(usuario?: UsuarioInterface): void {
    if(usuario){
      localStorage.setItem("id_usuario", usuario.id_usuario.toString());
      localStorage.setItem("usuarioLogado", usuario.usuario);
      localStorage.setItem("usuario_admin", usuario.admin.toString());
      localStorage.setItem("usuario_nome", usuario.nome_usuario);
    }
  }

  public getUsuario(): string {
    return localStorage.getItem("usuarioLogado");
  }

  public removeUsuario(): void {
    localStorage.removeItem("usuarioLogado");
  }
}

