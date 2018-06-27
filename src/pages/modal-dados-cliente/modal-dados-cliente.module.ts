import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDadosClientePage } from './modal-dados-cliente';

@NgModule({
  declarations: [
    ModalDadosClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDadosClientePage),
  ],
})
export class ModalDadosClientePageModule { }
