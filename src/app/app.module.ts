import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListItemPage } from '../pages/list-item/list-item';
import { PicturePage } from '../pages/picture/picture';
import { BaseHeaderComponent } from '../components/base-header/base-header'
import { CameraProvider } from '../providers/camera/camera';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CreateItemPage } from '../pages/create-item/create-item';
import { ProductsProvider } from '../providers/products/products';
import { DatastoreProvider } from '../providers/datastore/datastore';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListItemPage,
    PicturePage,
    CreateItemPage,
    BaseHeaderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListItemPage,
    PicturePage,
    CreateItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraProvider,
    Camera,
    ProductsProvider,
    DatastoreProvider
  ]
})
export class AppModule {}
