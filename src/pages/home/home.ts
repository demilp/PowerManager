import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectPage } from '../connect/connect';
import { PowerProvider } from '../../providers/power/power';
import { Toast } from '@ionic-native/toast';
import { KillProcessPage } from '../kill-process/kill-process';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private powerProvider: PowerProvider, private toast: Toast) {
    
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
        this.toast.show('Success', 'short', 'bottom');
      }else{
        this.toast.show('Failure', 'short', 'bottom');
      }
    })
    .catch(err=>{this.toast.show(err, 'short', 'bottom');;
    });
  }
  openKillProcess(){
    this.navCtrl.push(KillProcessPage);
  }
}
