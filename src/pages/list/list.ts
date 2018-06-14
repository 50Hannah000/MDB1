import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListItemPage } from '../list-item/list-item';
import { Product } from '../../app/models/product';
import { ProductsProvider } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  products: Product[];
  private page = 0;
  private limit = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductsProvider) {
    
  }

  ionViewDidEnter() {
    this.fetchNewPage();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListItemPage, {
      item: item
    });
  }

  protected doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.fetchNewPage();
      infiniteScroll.complete();
    }, 500);
  }

  private fetchNewPage() {
    this.page++;

    console.log(this.productProvider.getAllProducts(this.limit, this.page));

    
  }
}
