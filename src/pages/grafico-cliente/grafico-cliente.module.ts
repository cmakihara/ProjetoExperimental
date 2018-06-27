import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { GraficoClientePage } from './grafico-cliente';


@NgModule({
  declarations: [
    GraficoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoClientePage),
    ChartsModule
  ],
})
export class GraficoClientePageModule {}
