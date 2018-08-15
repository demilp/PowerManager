import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { PowerProvider } from '../../providers/power/power';
import { HomePage } from "../home/home";
import { wake } from "wake_on_lan";
import { DevicesProvider } from '../../providers/devices/devices';


/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

  private ip: string;
  private password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private powerProvider: PowerProvider, private toast: ToastController, private devices: DevicesProvider, private menu: MenuController) {
  }

  ionViewWillEnter(){  
    this.ip = localStorage.getItem('ip');
    this.password = localStorage.getItem('password');
    this.onConnect();    
    this.menu.enable(true, "menu");
  }
  
  onConnect(){
    this.powerProvider.connect(this.ip, this.password).then(res=>{      
      if(res.success === true){
        localStorage.setItem('ip', res.ip);
        localStorage.setItem('password', res.password);
        this.navCtrl.setRoot(HomePage);
        this.devices.addDevice({ip:res.ip, mac:res.data.mac, hostname: res.data.hostname, password:res.password});
        this.navCtrl.popToRoot();
      }else{
        this.toast.create({message:res.error, duration:1500, position:'bottom'});
      }
    }, err=>{this.toast.create({message:err, duration:1500, position:'bottom'});})
    .catch(err=>{this.toast.create({message:err, duration:1500, position:'bottom'});});
  }
}
