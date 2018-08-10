import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ViewController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ConnectPage } from '../pages/connect/connect';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ConnectPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private app: App) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Connect', component: ConnectPage }
    ];

    platform.registerBackButtonAction(() => {
      let nav = app.getActiveNav();
      let activeView: ViewController = nav.getActive();
  
      if(activeView != null){
        if (typeof activeView.instance.backButtonAction === 'function'){
          activeView.instance.backButtonAction()
        }else if(nav.canGoBack()) {
          nav.pop();
        }
        else nav.parent.select(0);
      }
    });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
