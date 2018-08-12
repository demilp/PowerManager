import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PowerProvider } from '../../providers/power/power';
import { HomePage } from "../home/home";
import { Toast } from '@ionic-native/toast';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private powerProvider: PowerProvider, private toast: Toast) {
  }

  ionViewWillEnter(){  
    this.ip = localStorage.getItem('ip');
    this.password = localStorage.getItem('password');
    this.onConnect();
  }
  
  onConnect(){
    this.powerProvider.connect(this.ip, this.password).then(res=>{
      console.log(res); 
      this.toast.showShortBottom('toast: ' + res).subscribe(t=>console.log(t));
      if(res.success === true){
        localStorage.setItem('ip', res.ip);
        localStorage.setItem('password', res.password);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      }else{
        this.toast.show(res.error, 'short', 'bottom');
      }
    }, err=>{this.toast.show(err, 'short', 'bottom')})
    .catch(err=>{this.toast.show(err, 'short', 'bottom');});    
  }
}
