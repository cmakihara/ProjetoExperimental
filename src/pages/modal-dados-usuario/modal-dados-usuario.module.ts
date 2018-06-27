import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDadosUsuarioPage } from './modal-dados-usuario';

@NgModule({
  declarations: [
    ModalDadosUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDadosUsuarioPage),
  ],
})
export class ModalDadosUsuarioPageModule {}
