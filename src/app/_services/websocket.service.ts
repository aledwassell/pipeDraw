import {Injectable} from '@angular/core';
import {Observable, observable, Observer, Subject} from "rxjs";
import { Sketch } from "../_interfaces/sketch"
import * as socketIo from 'socket.io-client';
import {Socket} from "../_interfaces/socket";

declare var io: {
    connect(url: string): Socket;
};

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    socket: Socket;
    observer: Observer<Sketch>;
    getData(): Observable<Sketch> {
        this.socket = socketIo('http://localhost:3200');
        this.socket.on('data', (res) => {
            console.log(res);
            this.observer.next(res);
        });
        return this.createObservable();
    }

    sendData(d: Sketch): void {
        this.socket.emit('data', d);
    }

    createObservable(): Observable<any> {
        return new Observable(observer => {
            this.observer = observer;
        });
    }
}
