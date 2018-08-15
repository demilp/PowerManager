import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConnectPage } from '../pages/connect/connect';
import { KillProcessPage } from '../pages/kill-process/kill-process';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PowerProvider } from '../providers/power/power';
import { ProcessHttpMsgProvider } from "../providers/process-http-msg/process-http-msg";
//import { HttpClient, HttpHandler } from '../../node_modules/@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Toast } from '../../node_modules/@ionic-native/toast';
import { DevicesPage } from '../pages/devices/devices';
import { DevicesProvider } from '../providers/devices/devices';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnectPage,
    KillProcessPage,
    DevicesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnectPage,
    KillProcessPage,
    DevicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PowerProvider,
    ProcessHttpMsgProvider,
    Toast,
    DevicesProvider
  ]
})
export class AppModule {}
