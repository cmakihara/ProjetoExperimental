import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoClientePage } from './historico-cliente';

@NgModule({
  declarations: [
    HistoricoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoClientePage),
  ],
})
export class HistoricoClientePageModule {}
