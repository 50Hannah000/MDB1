import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera'
import { Vibration } from '@ionic-native/vibration';
import { ProductsProvider } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {
  item: any;
  vibration: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public cameraService: CameraProvider,
    public productProvider: ProductsProvider,
    private vibrationService: Vibration
  ) {
    this.vibration = vibrationService;
    this.item =  navParams.get('item') ? navParams.get('item') : { name: '', description: '', quantity: 0, image: '' }; ;
  }

  vibrate() {
    this.vibration.vibrate([2000,1000,2000]);
  }

  increment() {
    this.item.quantity++;
  }
  
  decrement() {
    if(this.item.quantity > 0) {
      this.item.quantity--;
    }
  }

  create() {
    //SENTTOAPI
    this.vibrate();
    this.navCtrl.pop();
    console.log('gepopt');
  }

  takePicture(){
    this.cameraService.takePhoto();
    this.item.image = this.cameraService.photo;
  }
}