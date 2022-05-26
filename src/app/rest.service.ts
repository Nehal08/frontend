import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url : string = "http://127.0.0.1:5000/";

  constructor(private http: HttpClient) { }

  getSolution(eq: any){
    return this.http.post(this.url,eq)
  }

}
