import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosConfirmadosPage } from './pedidos-confirmados';

@NgModule({
  declarations: [
    PedidosConfirmadosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosConfirmadosPage),
  ],
})
export class PedidosConfirmadosPageModule {}
