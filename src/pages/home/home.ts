import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectPage } from '../connect/connect';
import { PowerProvider } from '../../providers/power/power';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private powerProvider: PowerProvider) {
    
  }
  logOut(){    
    localStorage.setItem('password', '');
    this.navCtrl.setRoot(ConnectPage);   
    this.navCtrl.popToRoot();
  }
  do(command:string){
    this.powerProvider.do(command)
    .then(res=>{console.log(res);
    })
    .catch(err=>{console.log(err);
    });
  }

}
