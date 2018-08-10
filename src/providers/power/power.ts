import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';

/*
  Generated class for the PowerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PowerProvider {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
    })
  };
  constructor(public http: HttpClient, private processHttpMsgProvider: ProcessHttpMsgProvider) {
    console.log('Hello PowerServiceProvider Provider');  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
  }
  connect(ip:string, password:string):Promise<{success:Boolean, ip:string, password:string}>{
    
    //return this.http.post<{success:Boolean, ip:string, password:string}>('http://' + ip + '/powermanager/connect', password)
    return this.http.post<{success:Boolean, ip:string, password:string}>('http://' + ip + '/powermanager/Connect', password, this.httpOptions)
    .catch(err=>{return this.processHttpMsgProvider.handleError(err)}).map(res => {return {success:res, ip:ip, password:password}}).toPromise<{success:Boolean, ip:string, password:string}>();
  }
  do(command:string):Promise<Boolean>{
    var url = 'http://' + localStorage.getItem('ip') + '/powermanager/'+command;
    console.log(url);
    
    return this.http.post<Boolean>(url, localStorage.getItem('password'), this.httpOptions)
    .catch(err=>{return this.processHttpMsgProvider.handleError(err)}).toPromise<Boolean>();
  }

}
