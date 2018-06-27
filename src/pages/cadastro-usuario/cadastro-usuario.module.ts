import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroUsuarioPage } from './cadastro-usuario';

@NgModule({
  declarations: [
    CadastroUsuarioPage,
  ],
  entryComponents: [
    CadastroUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroUsuarioPage),
  ],
})
export class CadastroUsuarioPageModule { }
