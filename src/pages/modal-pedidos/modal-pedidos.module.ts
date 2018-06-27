import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPedidosPage } from './modal-pedidos';

@NgModule({
  declarations: [
    ModalPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPedidosPage),
  ],
})
export class ModalPedidosPageModule {}
