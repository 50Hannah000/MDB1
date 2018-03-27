import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListItemPage');
  }

}
