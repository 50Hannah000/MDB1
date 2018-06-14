import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListItemPage } from '../list-item/list-item';
import { Product } from '../../app/models/product';
import { ProductsProvider } from '../../providers/products/products';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  products: Product[] = [];
  private page = 0;
  private limit = 15;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductsProvider, private storage: Storage) {
    
  }

  ionViewDidEnter() {
    this.storage.get('products').then( products => {
      if(products) {
        this.products = products;
        this.page++;
      } else {
        this.fetchNewPage();
      }
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push('ListItemPage', {
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
    if(this.page < this.productProvider.maxPages) {
      this.page++;
      this.productProvider.getAllProducts(this.limit, this.page).then(res => {
        this.products.push.apply(this.products, res);
        if(this.page == 1) {
          this.storage.set('products', this.products);
        }
      }); 
    }
  }
}
