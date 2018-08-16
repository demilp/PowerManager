import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";
import { ToastController } from 'ionic-angular';
;

//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/map';
// plugin installation needed:
// ionic plugin add --save  cordova-plugin-chrome-apps-sockets-udp
// https://www.npmjs.com/package/cordova-plugin-chrome-apps-sockets-udp
declare var chrome;

@Injectable()
export class UdpProvider {

    private socketid: number;
    //private udpstream: BehaviorSubject<Object> = new BehaviorSubject({});


    constructor(private toast: ToastController) {
        
        
    };
    sendMagicPacket(mac:string, port:number, ip:string){
        if (typeof chrome.sockets !== 'undefined') {
            console.log('==');
            
            chrome.sockets.udp.sendMagicPacket(mac, port, ip, (res)=>{
                console.log('----');
                
                console.log(JSON.stringify(res)+'___');                
            });
        }
    }
    sendUDPMessage(message: any, port: number, addresses: Array<string>/*, ttl: number, timetolisten: number*/) {
        // convert string to ArrayBuffer - taken from Chrome Developer page
        function str2ab(str) {
            var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
            var bufView = new Uint16Array(buf);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        }

        function ab2str(buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        };

        function b2ab(buf) {
          var ab = new ArrayBuffer(buf.length);
          var view = new Uint8Array(ab);
          for (var i = 0; i < buf.length; ++i) {
              view[i] = buf[i];
          }
          return ab;
        }
        // only do udp stuff if there is plugin defined
        if (typeof chrome.sockets !== 'undefined') {
            // register the listeners
            /*chrome.sockets.udp.onReceive.addListener(
                (info) => {
                    // we have found one 
                //      console.log('Recv from socket: ', info,ab2str(info.data) );
                    this.udpstream.next(info);
                }
            );*/
            /*chrome.sockets.udp.onReceiveError.addListener(
                (error) => {
                    console.log('Recv  ERROR from socket: ', error);
                    this.udpstream.next({ 'error': error });
                }
            );*/

            let SENDBUFFER: ArrayBuffer;
            // translate the string into ArrayBuffer
            if(message instanceof String){
                SENDBUFFER = str2ab(message);
            }else{
                SENDBUFFER = message;
            }
            
            // send  the UDP search as captures in UPNPSTRING and to port PORT
            chrome.sockets.udp.create((createInfo) => {
                chrome.sockets.udp.bind(createInfo.socketId, '0.0.0.0', port, (bindresult) => {
                    this.socketid = createInfo.socketId;

                    //chrome.sockets.udp.setMulticastTimeToLive(createInfo.socketId, ttl, (ttlresult) => {

                        chrome.sockets.udp.setBroadcast(createInfo.socketId, true, (sbresult) => {
                            // do all adresses 
                            addresses.forEach(address => {                                                            
                                chrome.sockets.udp.send(createInfo.socketId, SENDBUFFER, address, port, (sendInfo) => {
                                    this.toast.create({message: 'sendresult: '+sendInfo}).present();
                                    if (sendInfo.resultCode < 0) {
                                        console.log('send fail: ' + sendInfo);
                                        // close all the stuff, send has failed
                                        this.closeUdpProvider();
                                        //this.udpstream.next({ 'error': sendresult });
                                    } else {
                                        console.log('sendTo: success ' + port, createInfo, bindresult, /*ttlresult,*/ sbresult, sendInfo);
                                        //this.closeUdpProvider();
                                    }
                                });
                           
                            });
                        });
                    //});
                });
            });
            // and close the listener after a while
            /*setTimeout(() => {
                this.closeUdpProvider();
            }, timetolisten);*/
        }
        // return the stream
        //return this.udpstream.asObservable().skip(1);

    }

    closeUdpProvider() {
        // close the socket
        if (typeof chrome.sockets !== 'undefined') chrome.sockets.udp.close(this.socketid);

        // close the stream
        //this.udpstream.complete();
    }

}