import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PowerProvider } from '../../providers/power/power';
import { Toast } from '../../../node_modules/@ionic-native/toast';

/**
 * Generated class for the KillProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kill-process',
  templateUrl: 'kill-process.html',
})
export class KillProcessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private powerProvider: PowerProvider, private toast: Toast) {
  }

  ionViewDidLoad() {
  }
  processList: {pid: number, processName: string};
  ionViewWillEnter(){
    this.processList = null;
    this.powerProvider.do('ListProcesses').then(res =>{
      this.processList = res.data;
    }).catch(err=>{
      this.toast.show(err, 'short', 'bottom');
      this.navCtrl.pop();
    });
  }
  killProcess(pid: number){
    this.powerProvider.killProcess(pid)
    .then(res=>{
      if(res.success == true){
        this.toast.show('Success', 'short', 'bottom');
      }else{
        this.toast.show(res.error, 'short', 'bottom');
      }
    }).catch(err=>{
      this.toast.show(err, 'short', 'bottom');
    });
  }

}
