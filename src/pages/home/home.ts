import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CreateItemPage } from '../create-item/create-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  goToStock() {
    this.navCtrl.push(ListPage);
  }
  goToCreate() {
    this.navCtrl.push(CreateItemPage);
  }
}
