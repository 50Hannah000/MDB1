import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListItemPage } from './list-item';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ListItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ListItemPage),
    ComponentsModule
  ],
})
export class ListItemPageModule {}
