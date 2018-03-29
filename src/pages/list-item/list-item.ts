import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Img } from 'ionic-angular/components/img/img-interface';

/**
 * Generated class for the ListItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-item',
  templateUrl: 'list-item.html',
})
export class ListItemPage {
  item: {title: string, note: string, icon: string};
  item2: {name: string, description: string, quantity: number, image: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {
    this.item = navParams.get('item');
    this.item2 = {
      name: 'Aarbei',
      description:"Vet lekkere aardbei",
      quantity: 4, image:'http://www.missethoreca.nl/restaurant/blog/2017/5/culi-column-michel-van-der-kroft-de-puike-aardbei-101271774'
    }
    console.log(this.item2.quantity)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListItemPage');
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
}
