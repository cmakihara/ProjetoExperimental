import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomePage,
  ],
  entryComponents: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ChartsModule
  ],
})
export class HomePageModule { }
