import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera'
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {

  item: {title: string, note: string, icon: string};
  item2: {name: string, description: string, quantity: number, image: string};
  vibration: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionsheetCtrl: ActionSheetController, public cameraService: CameraProvider, private vibrationService: Vibration) {
    this.vibration = vibrationService;
    this.item = navParams.get('item');
    this.item2 = { 
      name: 'Aarbei', 
      description:"Vet lekkere aardbei", 
      quantity: 4, image:'http://www.missethoreca.nl/restaurant/blog/2017/5/culi-column-michel-van-der-kroft-de-puike-aardbei-101271774' 
    }
  }
  vibrate(){
    this.vibration.vibrate([2000,1000,2000]);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad createoage');
  }

  increment() {
    console.log(this.item2.quantity)
    this.item2.quantity++;
  }
  
  decrement() {
    console.log(this.item2.quantity)
    if(this.item2.quantity > 0) {
      this.item2.quantity--;
    }
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(){
    this.cameraService.takePhoto();
  }
}