import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PowerProvider } from '../../providers/power/power';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private powerProvider: PowerProvider, private toast: ToastController) {
  }

  ionViewDidLoad() {
  }
  processList: {pid: number, processName: string};
  ionViewWillEnter(){
    this.processList = null;
    this.powerProvider.do('ListProcesses').then(res =>{
      console.log(res);
      
      this.processList = res.data;
    }).catch(err=>{
      this.toast.create({message:err, duration:1500, position:'bottom'}).present();
      this.navCtrl.pop();
    });
  }
  killProcess(pid: number){
    this.powerProvider.killProcess(pid)
    .then(res=>{
      if(res.success == true){
        this.toast.create({message:'Success', duration:1500, position:'bottom'}).present();
      }else{
        this.toast.create({message:'Failure', duration:1500, position:'bottom'}).present();
      }
    }).catch(err=>{
      this.toast.create({message:err, duration:1500, position:'bottom'}).present();
    });
  }

}
