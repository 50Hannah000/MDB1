import { Component, Input } from '@angular/core';
import { App} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'base-header',
  templateUrl: 'base-header.html'
})

export class BaseHeaderComponent {

  @Input() title: string;
  constructor(private datastore: AuthenticationProvider, private app: App) { }

  logout() {
    this.datastore.logout().subscribe(succ => {
      this.app.getRootNav().setRoot('LoginPage');
    })
  }
}
