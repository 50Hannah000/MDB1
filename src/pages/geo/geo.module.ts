import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeoPage } from './geo';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GeoPage,
  ],
  imports: [
    IonicPageModule.forChild(GeoPage),
    ComponentsModule
  ],
})
export class GeoPageModule {}
