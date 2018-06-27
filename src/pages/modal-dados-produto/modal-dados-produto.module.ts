import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDadosProdutoPage } from './modal-dados-produto';

@NgModule({
  declarations: [
    ModalDadosProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDadosProdutoPage),
  ],
})
export class ModalDadosProdutoPageModule {}
