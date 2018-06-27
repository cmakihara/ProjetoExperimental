import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateClientePage } from './update-cliente';
import { BrMaskerModule } from 'brmasker-ionic-3';
@NgModule({
  declarations: [
    UpdateClientePage,
  ],
  entryComponents: [
    UpdateClientePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateClientePage),
    BrMaskerModule,
  ],
})
export class UpdateClientePageModule { }
