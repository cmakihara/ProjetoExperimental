import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUpdateUsuarioPage } from './modal-update-usuario'


@NgModule({
  declarations: [
    ModalUpdateUsuarioPage,
  ],
  entryComponents: [
    ModalUpdateUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUpdateUsuarioPage),
  ],
})
export class ModalUpdateUsuarioPageModule {}
