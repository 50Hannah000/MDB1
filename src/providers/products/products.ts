import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductsProvider Provider');
  }

  public products()
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+ 'token'); //change token to real token
  };
    

    public getCurrentPost(){
        // return this.currentPost;
    }
}
