import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarClientePage } from './buscar-cliente';

@NgModule({
  declarations: [
    BuscarClientePage,
  ],
  entryComponents: [
    BuscarClientePage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarClientePage),
  ],
})
export class BuscarClientePageModule { }
