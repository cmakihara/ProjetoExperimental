import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalVendaDadosProdutoPage } from './modal-venda-dados-produto';

@NgModule({
  declarations: [
    ModalVendaDadosProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalVendaDadosProdutoPage),
  ],
})
export class ModalVendaDadosProdutoPageModule {}
