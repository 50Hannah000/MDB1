import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateItemPage } from './create-item';
import { BaseHeaderComponent } from '../../components/base-header/base-header';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreateItemPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateItemPage),
    ComponentsModule 
  ],
})
export class CreateItemPageModule {}
