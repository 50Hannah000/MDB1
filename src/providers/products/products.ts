import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationProvider } from '../authentication/authentication';
import { Storage } from '@ionic/storage';
import { Product } from '../../app/models/product';

@Injectable()
export class ProductsProvider {
  currentToken: string;

  constructor(public http: Http, private auth: AuthenticationProvider, private storage: Storage) {

   }

  getAllProducts(limit?: Number, page?: Number)
  {
      var params = '';
      
      if((limit && limit > 0) || (page && page > 0)) {
        params += '?';
      }

      if(limit && limit > 0) {
        params += 'limit=' + limit;
      }

      if(page && page > 0) {
        if(limit && limit > 0){
          params += '&';
        }
        params += 'page=' + page;
      }

      return this.storage.get('currentToken').then(token => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('contenttype', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        const httpOptions = {
          headers: headers
        };

        return new Promise(resolve => {
          this.http.get(this.auth.getBaseUrl() + '/products' + params, httpOptions).map(res => res.json())
              .subscribe(data => {
                let products: Product[] = [];
                data.products.forEach(product => {
                  products.push({
                    _id: product._id,
                    name: product.name,
                    imagePath: product.imagePath,
                    price: product.price
                  });
                });
                resolve(products);
                }, err => {
                  
                }
              );
      });
    });      
  };
    
}
