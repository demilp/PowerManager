import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { ConnectPage } from '../connect/connect';
import { PowerProvider } from '../../providers/power/power';
import { KillProcessPage } from '../kill-process/kill-process';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private powerProvider: PowerProvider, private toast: ToastController, private menu: MenuController) {
    
  }
  ionViewWillEnter(){
    this.menu.enable(false, "menu");
  }
  logOut(){    
    localStorage.setItem('password', '');
    this.navCtrl.setRoot(ConnectPage);   
    this.navCtrl.popToRoot();
  }

  do(command:string){
    this.powerProvider.do(command)
    .then(res=>{
      if(res.success == true){
        this.toast.create({message:'Success', duration:1500, position:'bottom'}).present();
      }else{
        this.toast.create({message:'Failure', duration:1500, position:'bottom'}).present();
      }
    })
    .catch(err=>{this.toast.create({message:err, duration:1500, position:'bottom'}).present();
    });
  }
  openKillProcess(){
    this.navCtrl.push(KillProcessPage);
  }
}
