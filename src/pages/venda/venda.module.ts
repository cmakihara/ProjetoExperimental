import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendaPage } from './venda';

@NgModule({
  declarations: [
    VendaPage,
  ],
  entryComponents: [
    VendaPage,
  ],
  imports: [
    IonicPageModule.forChild(VendaPage),
  ],
})
export class VendaPageModule { }
