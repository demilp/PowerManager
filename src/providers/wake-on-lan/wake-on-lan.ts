import { Injectable } from '@angular/core';
import { UdpProvider } from '../udp/udp';

/*
  Generated class for the WakeOnLanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WakeOnLanProvider {

  constructor(private udp: UdpProvider) {
    
  }
  private mac_bytes = 6;
  private createMagicPacket(mac): ArrayBuffer{
    var mac_b = new ArrayBuffer(this.mac_bytes) //allocBuffer(mac_bytes)
      , i
      ;
    var mac_buffer = new Uint8Array(mac_b);
    if (mac.length == 2 * this.mac_bytes + (this.mac_bytes - 1)) {
      mac = mac.replace(new RegExp(mac[2], 'g'), '');
    }
    if (mac.length != 2 * this.mac_bytes || mac.match(/[^a-fA-F0-9]/)) {
      throw new Error("malformed MAC address '" + mac + "'");
    }
  
    for (i = 0; i < this.mac_bytes; ++i) {
      mac_buffer[i] = parseInt(mac.substr(2 * i, 2), 16);
    }
    
    var num_macs = 16
      , b   = new ArrayBuffer((1 + num_macs) * this.mac_bytes)//allocBuffer((1 + num_macs) * this.mac_bytes);
      var buffer = new Uint8Array(b)
    for (i = 0; i < this.mac_bytes; ++i) {
      buffer[i] = 0xff;
    }
    for (i = this.mac_bytes; i < buffer.byteLength; i++) {
      buffer[i] = mac_buffer[i%this.mac_bytes]
    }
    return buffer.buffer;
  }
  wol(mac, opts?, callback?){
    if (typeof opts === 'function') {
      callback = opts;
      opts = undefined;
    }

    opts = opts || {};
  
    var address:string     = opts['address']     || '255.255.255.255'
      , num_packets = opts['num_packets'] || 3
      , interval    = opts['interval']    || 100
      , port        = opts['port']        || 9000
      , magic_packet = this.createMagicPacket(mac)
      //, socket = dgram.createSocket(net.isIPv6(address) ? 'udp6' : 'udp4')
      , i = 0
      ;
      for (i = 0; i < num_packets; i++) {
        setTimeout(()=>{this.sendWoL(magic_packet, port, [address]);}, interval*i);
      }    
  }
  private sendWoL(message: ArrayBuffer, port: number, addresses: Array<string>) {
    this.udp.sendUDPMessage(message, port, addresses);
  }
}
