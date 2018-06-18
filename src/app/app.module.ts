import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BaseHeaderComponent } from '../components/base-header/base-header'
import { CameraProvider } from '../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { ProductsProvider } from '../providers/products/products';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { Vibration } from  '@ionic-native/vibration';
import { OneSignal } from '@ionic-native/onesignal';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraProvider,
    Camera,
    ProductsProvider,
    AuthenticationProvider,
    Vibration,
    OneSignal,
    AndroidPermissions,
    Geolocation

  ]
})
export class AppModule {}
