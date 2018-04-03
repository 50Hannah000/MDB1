import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const config: any = {
  baseUrl: 'http://174.138.7.193/api',
  models: {  }
}

@Injectable()
export class DatastoreProvider {

  constructor(http: Http) {
    
  }

}
