import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicturePage } from './picture';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PicturePage,
  ],
  imports: [
    IonicPageModule.forChild(PicturePage),
    ComponentsModule
  ],
})
export class PicturePageModule {}
