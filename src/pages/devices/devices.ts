import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '../../shared/device';
import { DevicesProvider } from '../../providers/devices/devices';
import { PowerProvider } from '../../providers/power/power';
import { ConnectPage } from '../connect/connect';

/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private devicesProvider: DevicesProvider, private powerProvider: PowerProvider) {
    
  }

  ionViewDidLoad() {
  }
  devices: Device[];
  ionViewWillEnter(){
    this.devices = this.devicesProvider.getDevices();
  }
  wol(d: Device){
    this.powerProvider.wol(d);
  }
  connect(d: Device){
    localStorage.setItem('ip', d.ip);
    localStorage.setItem('password', d.password);
    this.navCtrl.push(ConnectPage)
    
    this.navCtrl.popToRoot();
  }
  remove(d: Device){
    this.devices = this.devicesProvider.removeDevice(d);
  }
  
}
