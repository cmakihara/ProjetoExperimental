import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPedidoPage } from './modal-pedido';

@NgModule({
  declarations: [
    ModalPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPedidoPage),
  ],
})
export class ModalPedidoPageModule {}
