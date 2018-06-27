import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUpdateProdutoPage } from './modal-update-produto';

@NgModule({
  declarations: [
    ModalUpdateProdutoPage,
  ],
  entryComponents: [
    ModalUpdateProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUpdateProdutoPage),
  ],
})
export class ModalUpdateProdutoPageModule {}
