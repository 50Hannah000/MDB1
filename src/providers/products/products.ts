import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationProvider } from '../authentication/authentication';
import { Storage } from '@ionic/storage';
import { Product } from '../../app/models/product';

@Injectable()
export class ProductsProvider {
  currentToken: string;
  maxPages: Number = 1;

  constructor(public http: Http, private auth: AuthenticationProvider, private storage: Storage) {
    this.getAllProducts();
   }

  getAllProducts(limit?: Number, page?: Number) : Promise<Product[]>
  {
      var params = '';
      
      if((limit && limit > 0) || (page && page > 0 && page <= this.maxPages)) {
        params += '?';
      }

      if(limit && limit > 0) {
        params += 'limit=' + limit;
      }

      if(page && page > 0 && page <= this.maxPages) {
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

        return new Promise<Product[]>(resolve => {
          this.http.get(this.auth.getBaseUrl() + '/products' + params, httpOptions).map(res => res.json())
              .subscribe(data => {
                this.maxPages = data.pages;
                resolve(data.products as Product[])
              });
      });
    }); 
  };

  updateProduct(product){
    return this.storage.get('currentToken').then(token => {
      const headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('contenttype', 'application/json');
      headers.append('Authorization', 'Bearer ' + token);

      const httpOptions = {
        headers: headers
      };

      let jsonProduct = JSON.stringify({
        "_id": product._id,
        "name": product.name,
        "quantity": product.quantity
      });

      if(product.imagePath) {
        jsonProduct["imagePath"] = product.imagePath;
      }

      return new Promise(resolve => {
        this.http.put(this.auth.getBaseUrl() + '/products/' + product._id, jsonProduct , httpOptions).map(res => res.json())
            .subscribe(data => {
              console.log('data', data);
                resolve(data);
              }, err => {
                console.log(err);
              }
            );
    });
  }); 
  }
}
