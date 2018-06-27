import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroClientePage } from './cadastro-cliente';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CadastroClientePage,
  ],
  entryComponents: [
    CadastroClientePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroClientePage),
    BrMaskerModule,
  ],
})
export class CadastroClientePageModule { }
