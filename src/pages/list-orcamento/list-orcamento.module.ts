import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOrcamentoPage } from './list-orcamento';

@NgModule({
  declarations: [
    ListOrcamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOrcamentoPage),
  ],
})
export class ListOrcamentoPageModule {}
