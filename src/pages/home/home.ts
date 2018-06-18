import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CreateItemPage } from '../create-item/create-item';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProductsProvider } from '../../providers/products/products';
import { User } from '../../app/models/user';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: User;
  products: any;
  msgProducts: any;

  constructor(private storage: Storage, private socialSharing: SocialSharing, public navCtrl: NavController, public auth: AuthenticationProvider, public productProvider: ProductsProvider) { }

  ionViewDidLoad() {

    this.storage.get('currentUser').then((user) => {
      this.user = user;
    });
    
    this.productProvider.getAllProducts().then(products => {
      this.products = products;
    });
  }

  protected goToMap() {
    this.navCtrl.push("GeoPage");
  }
  
  protected goToStock() {
    this.navCtrl.push("ListPage");
  }

  protected goToCreate() {
    this.navCtrl.push("CreateItemPage");
  }

  protected regularShare() {    
    this.socialSharing.share(this.getMsg(), null, null, null);
  }

  protected whatsappShare() {
     this.socialSharing.shareViaWhatsApp(this.getMsg(), null, null);
  }

  protected twitterShare() {
    this.socialSharing.shareViaTwitter(this.getMsg(), null, null);
  }

  protected facebookShare() {
     this.socialSharing.shareViaFacebook(this.getMsg(), null, null);
  }

  private getMsg() :string {
    let msg = "Mijn Voorraad: ";
    this.products.forEach(product => {
      msg += "\n - " + product.name;
    });
    msg += "\n Verzonden met onze geweldige app !"
    return msg;
  }
}
