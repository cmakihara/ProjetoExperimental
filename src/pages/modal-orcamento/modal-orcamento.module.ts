import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalOrcamentoPage } from './modal-orcamento';

@NgModule({
  declarations: [
    ModalOrcamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalOrcamentoPage),
  ],
})
export class ModalOrcamentoPageModule {}
