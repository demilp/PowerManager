import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '../../shared/device';
import { DevicesProvider } from '../../providers/devices/devices';
import { ConnectPage } from '../connect/connect';
import { WakeOnLanProvider } from '../../providers/wake-on-lan/wake-on-lan';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html'

})
export class DevicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private devicesProvider: DevicesProvider, private wakeOnLan: WakeOnLanProvider, private androidPermissions: AndroidPermissions) {
    
  }

  ionViewDidLoad() {
  }
  devices: Device[];
  ionViewWillEnter(){
    this.devices = this.devicesProvider.getDevices();
  }
  wol(d: Device){
    /*this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
    );*/
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET);
    this.wakeOnLan.wol(d.mac);
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
