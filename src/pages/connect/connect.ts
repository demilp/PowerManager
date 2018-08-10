import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PowerProvider } from '../../providers/power/power';
import { HomePage } from "../home/home";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private powerProvider: PowerProvider) {
  }

  ionViewWillEnter(){  
    this.ip = localStorage.getItem('ip');
    this.password = localStorage.getItem('password');
    this.onConnect();
  }
  
  onConnect(){
    this.powerProvider.connect(this.ip, this.password).then(res=>{
      if(res.success === true){
        localStorage.setItem('ip', res.ip);
        localStorage.setItem('password', res.password);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      }
    }, err=>{console.log(err);})
    .catch(err=>{console.log(err);});    
  }
}
