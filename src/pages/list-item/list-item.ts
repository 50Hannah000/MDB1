import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Img } from 'ionic-angular/components/img/img-interface';
import { ProductsProvider } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-list-item',
  templateUrl: 'list-item.html',
})
export class ListItemPage {
  item 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public productProvider: ProductsProvider
  ) 
  {
    this.item = navParams.get('item') ? navParams.get('item') : { name: '', description: '', quantity: 0, image: '' }; ;
  }

  ionViewDidLoad() {
  }

  increment() {
    if(this.item.quantity) {
      if(this.item.quantity > 0 ) {
        this.item.quantity++;
      }
    }
  }
  
  decrement() {
    if(this.item.quantity) {
      if(this.item.quantity > 0) {
        this.item.quantity--;
      }
    }
  }
  
  edit() {
    /*this.productProvider.updateProduct({
      "_id": "5ac27e21e424dc1f8581879d",
      "name": "trostomaat",
      "quantity": "8"
    }).then( res => {
      console.log('result', res);
    });*/
    this.navCtrl.pop();
  }
}
