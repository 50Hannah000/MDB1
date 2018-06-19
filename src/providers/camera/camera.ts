import { Injectable }            from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraProvider {
  photo: string;

  constructor(private camera: Camera, private alert: AlertController) { }

  ionViewDidLoad() {
    
  };

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
      return this.photo;
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
            
          }
        }
      ]
    });
  confirm.present();
  }
}