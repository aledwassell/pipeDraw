import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Subject<MessageEvent> {

    this.socket = io('http://localhost:5000/');

    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log(`got message from server ${data}`);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    }
    return Subject.create(observer, observable);
  }
}
