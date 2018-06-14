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
  map: GoogleMap;

  constructor(private storage: Storage, public navCtrl: NavController, public auth: AuthenticationProvider, public productProvider: ProductsProvider) { }

  ionViewDidLoad() {
    this.loadMap();
    
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

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}

