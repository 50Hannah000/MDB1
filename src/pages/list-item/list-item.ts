import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Img } from 'ionic-angular/components/img/img-interface';

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
    public actionsheetCtrl: ActionSheetController) 
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
    if(this.item){
      console.log('hlalo');
      console.log("item", this.item);
      // this.productProvider.updateProduct(this.item).then(products => {
      //   this.products = products;
      // });
    }
    console.log("item", this.item);
  }
}
