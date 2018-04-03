import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from  '../../validators/confirmPassword';
 
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerForm: FormGroup;
  submitAttempt: boolean = false;
 
  constructor(private nav: NavController, private auth: AuthenticationProvider, private alertCtrl: AlertController, public formBuilder: FormBuilder) {
    
    this.registerForm = formBuilder.group({
      name: ['',  Validators.required],
      email: ['', Validators.compose([Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(24), Validators.required])],
      passwordConfirmation: ['', ConfirmPasswordValidator.checkConfirmPassword]
    });

  }
 
  public register() {

    this.submitAttempt = true;

    if(this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account is aangemaakt.");
          this.nav.push('LoginPage');
        } else {
          this.showPopup("Error", "Er is een probleem met het aanmaken van je account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    }
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}