import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private oneSignal: OneSignal, private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'List', component: 'ListPage' },
      { title: 'ListItem', component: 'ListItemPage' },
      { title: 'PicturePage', component: 'PicturePage' },
      { title: 'CreateItemPage', component: 'CreateItemPage' },
    ];

    this.storage.get('currentToken').then(res => {
      if(res !== null) {
        this.nav.setRoot('HomePage');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (!(<any>window).cordova) {
        alert('This is a native feature. Please use a device');
      } else {
        this.oneSignal.startInit('8cf8b642-db9d-4676-8cfd-2cdd2efd00db', '1042537388685');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }
    });
  }

  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push received with app open:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push received when opening notification: ' + payload.body);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
