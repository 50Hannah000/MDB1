import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationProvider } from '../authentication/authentication';
import { Storage } from '@ionic/storage';

@Injectable()
export class StockProvider {

    constructor(public http: Http, private auth: AuthenticationProvider, private storage: Storage) { }

    getInStock() {
        return this.storage.get('currentToken').then(token => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('contenttype', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);

            const httpOptions = {
                headers: headers
            };

            return new Promise(resolve => {
                this.http.get(this.auth.getBaseUrl() + 'users/' + this.auth.getCurrentUser()._id + '/stock/' + this.auth.getCurrentUser().stock, httpOptions).map(res => res.json())
                    .subscribe(data => {
                        console.log('zooi', data);
                        resolve(data);
                      }, err => {
                        console.log(err);
                      }
                    );
            });
        });
    }

    
}
