import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
})
export class PicturePage {
  photo: any;
  base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alert: AlertController, private androidPermissions: AndroidPermissions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  };
  ngOnInit(){
    this.photo = Image;
  };
  takePhoto(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(result => {
      if(!result.hasPermission) {
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
      }},err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA));

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {    
      this.showErrorMessage(err);
         });
    };
  showErrorMessage(msg){
    let confirm = this.alert.create({
      title: 'Probleem met camera',
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
  confirm.present();
  }
}
