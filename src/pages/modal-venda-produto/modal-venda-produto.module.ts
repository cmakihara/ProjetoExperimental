import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProdutoPage } from './modal-venda-produto';

@NgModule({
  declarations: [
    ModalProdutoPage,
  ],
  entryComponents: [
    ModalProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProdutoPage),
  ],
})
export class ModalVendaProdutoPageModule { }
