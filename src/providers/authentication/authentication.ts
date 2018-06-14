import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as bcrypt from 'bcryptjs';
import { User } from '../../app/models/user';
import * as jwt from 'jwt-simple';
import { Storage } from '@ionic/storage';

const config: any = {
  baseUrl: 'https://webs5-api.herokuapp.com',
  secret: 'HCHGB254352325NKJKLMGFJUI<L_H&(*)@(HGVHKCSVD53253252SBfgfdgdgfsegsvsf'
}

@Injectable()
export class AuthenticationProvider {
  currentToken: string;
  currentUser: User;

  constructor(public http: Http, private storage: Storage) { }

  login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Vul je gegevens in!");
    } else {
      const headers = new Headers();
        headers.append('contenttype', 'application/json')
        headers.append('Content-Type', 'application/json');

      const httpOptions = {
        headers: headers
      };

      return Observable.create(observer => {
        this.http.post(this.getBaseUrl() + '/token', credentials, httpOptions ).map(res => res.json())
          .subscribe(
            (data) => {
              this.currentToken = data.token;
              let userData = jwt.decode(data.token, config.secret);
              this.currentUser = {
                _id: userData._id,
                name: userData.local.name,
                email: userData.local.email,
                password: userData.local.password,
                stock: userData.stock
              };
              
              let access = (this.currentUser != null && this.currentToken != null);

              this.storage.set('currentToken', this.currentToken);
              this.storage.set('currentUser', this.currentUser);

              observer.next(access);
              observer.complete();
            },
            (err) => {
              observer.error("De combinatie van email en wachtwoord is fout");
            });
      });
    }
  }

  register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Alstublieft, vul je gegevens in!");
    } else if (credentials.password.length < 8) {
      console.log(credentials.password.count);
      return Observable.throw("Het wachtwoord moet minimaal 8 karakters lang zijn.");
    }
    else {
      let hash = this.generateHash(credentials.password);

      console.log(hash);

      const headers = new Headers();
        headers.append('contenttype', 'application/json');
        headers.append('Content-Type', 'application/json');

      const httpOptions = {
        headers: headers
      };

      this.http.post(this.getBaseUrl() + '/users', credentials, httpOptions).map(res => res.json())
          .subscribe(
            (data) => {
              console.log(data);
            }
          );

          console.log('eyo');

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.currentToken = null;
      observer.next(true);
      observer.complete();
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentToken() {
    return this.currentToken;
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  getBaseUrl() {
    return config.baseUrl;
  }

}
