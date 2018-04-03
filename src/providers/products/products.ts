import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationProvider } from '../authentication/authentication';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProductsProvider {
  products: any;
  currentToken: string;

  constructor(public http: Http, private auth: AuthenticationProvider, private storage: Storage) {
    
   }

  getAllProducts()
  {
      return this.storage.get('currentToken').then(token => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('contenttype', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        const httpOptions = {
          headers: headers
        };

        return new Promise(resolve => {
          this.http.get(this.auth.getBaseUrl() + '/products', httpOptions).map(res => res.json())
              .subscribe(data => {
                  resolve(data.products);
                }, err => {
                  console.log(err);
                }
              );
      });
    });      
  };
    
}
