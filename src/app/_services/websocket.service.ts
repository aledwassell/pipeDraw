import {Injectable, OnInit} from '@angular/core';
import {Observable, observable, Observer, Subject} from "rxjs";
import { Sketch } from "../_interfaces/sketch"
import * as io from 'socket.io-client';
import { FormControl } from "@angular/forms"
import {Socket} from "../_interfaces/socket";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private url = 'http://localhost:3200';
    private drawSocket: Socket;
    private drawObserver: Observer<any>;
    private socket: Socket;
    private observer: Observer<any>;

    sendDrawData(d: Sketch): void {
        this.socket.emit('data', d);
    }

    getDrawData(): Observable<any> {
        let observable = new Observable(observer => {
            this.drawSocket = io(this.url);
            this.drawSocket.on('data', (res) => {
                observer.next(res);
            });
            return;
        });
        return observable;
    }

    sendMessage(m: FormControl): Observable<FormControl> {
        this.socket.emit('message', m);
    }

    getMessages(): Observable<any> {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', data => {
                observer.next(data);
            });
            return;
        });
        return observable;
    }
}
