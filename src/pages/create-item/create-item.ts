import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera'
import { Vibration } from '@ionic-native/vibration';
import { ProductsProvider } from '../../providers/products/products';
import { AndroidPermissions } from '@ionic-native/android-permissions';

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
    private vibrationService: Vibration,
    private androidPermissions: AndroidPermissions
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
    this.vibrate();
    this.navCtrl.pop();
  }

  takePicture(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(result => {
      if(!result.hasPermission) {
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
      }},err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA));

    this.cameraService.takePhoto();
    this.item.image = this.cameraService.photo;
  }
}