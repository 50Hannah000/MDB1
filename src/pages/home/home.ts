import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CreateItemPage } from '../create-item/create-item';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProductsProvider } from '../../providers/products/products';
import { User } from '../../app/models/user';
import { Storage } from '@ionic/storage';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: User;
  products: any;

  constructor(private storage: Storage, public navCtrl: NavController, public auth: AuthenticationProvider, public productProvider: ProductsProvider) { }

  ionViewDidLoad() {
    
    this.storage.get('currentUser').then((user) => {
      this.user = user;
    });
    
    this.productProvider.getAllProducts().then(products => {
      this.products = products;
    });
  }
  
  goToStock() {
    this.navCtrl.push("ListPage");
  }
  goToCreate() {
    this.navCtrl.push("CreateItemPage");
  }

}

