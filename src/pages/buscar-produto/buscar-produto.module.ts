import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarProdutoPage } from './buscar-produto';

@NgModule({
  declarations: [
    BuscarProdutoPage,
  ],
  entryComponents: [
    BuscarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarProdutoPage),
  ],
})
export class BuscarProdutoPageModule { }
