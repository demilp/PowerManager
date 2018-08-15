import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';
import { Device } from '../../shared/device';
import { wake } from "wake_on_lan";

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
  }
  connect(ip:string, password:string):Promise<{success:Boolean, error:string, data:any, ip:string, password:string}>{
    
    //return this.http.post<{success:Boolean, ip:string, password:string}>('http://' + ip + '/powermanager/connect', password)
    let url = 'http://' + ip + ':63158/Connect';
    return this.http.post<{success:Boolean, error:string, data:any, ip:string, password:string}>(url, password, this.httpOptions)
    .catch(err=>{
      return this.processHttpMsgProvider.handleError(err)})
      .map(res => {
        let r = {success:res.success, ip:ip, password:password, data: res.data, error: res.error};
        return r
      })
      .toPromise<{success:Boolean, ip:string, password:string, data:any, error:string}>();
  }
  do(command:string):Promise<{success:Boolean, error:string, data:any}>{
    var url = 'http://' + localStorage.getItem('ip') + ':63158/'+command;    
    return this.http.post<{success:Boolean, error:string, data:any}>(url, localStorage.getItem('password'), this.httpOptions)
    .catch(err=>{return this.processHttpMsgProvider.handleError(err)})
    .toPromise<{success:Boolean, error:string, data:any}>();
  }
  killProcess(pid: number):Promise<{success:Boolean, error:string, data:any}>{
    let url = 'http://'+ localStorage.getItem('ip') + ':63158/KillProcess/'+pid;
    return this.http.post<{success:Boolean, error:string, data:any}>(url, localStorage.getItem('password'), this.httpOptions)
    .catch(err=>{
      return this.processHttpMsgProvider.handleError(err)
    })
    .toPromise<{success:Boolean, data:any, error:string}>();
  }
  wol(d: Device){
    wake(d.mac);
  }
}
