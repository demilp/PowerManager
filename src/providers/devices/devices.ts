import { Injectable } from '@angular/core';
import { Device } from '../../shared/device';

/*
  Generated class for the DevicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DevicesProvider {

  private devices: Device[];
  constructor() {
    let d = localStorage.getItem('devices');  
    if(d !== 'undefined'){
      let dev = JSON.parse(d);
      if(dev instanceof Array){
        this.devices = <Device[]>dev;        
      }else{
        localStorage.setItem('devices', JSON.stringify(this.devices));
      }
    }else{
      this.devices = [];
      localStorage.setItem('devices', JSON.stringify(this.devices));
    }
  }
  getDevices(): Device[]{
    return this.devices;
  }
  addDevice(d: Device): Device[]{
    if(this.devices == undefined){
      this.devices = [];
    }
    if(this.devices.find(c=>c.mac == d.mac)){
      return;
    }
    this.devices.push(d);
    localStorage.setItem('devices', JSON.stringify(this.devices));
    return this.devices;
  }
  removeDevice(d: Device): Device[]{
    if(this.devices.indexOf(d)>=0){
      this.devices.splice(this.devices.indexOf(d), 1);    
    }
    localStorage.setItem('devices', JSON.stringify(this.devices));
    return this.devices;    
  }

}
