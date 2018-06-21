import {Injectable} from '@angular/core';
import {Observable, observable, Observer, Subject} from "rxjs";
import { Sketch } from "../_interfaces/sketch"
import * as socketIo from 'socket.io-client';
import { FormControl } from "@angular/forms"
import {Socket} from "../_interfaces/socket";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    socket: Socket;
    observer: Observer<any>;
    message: Observer<string>;
    getData(): Observable<Sketch> {
        this.socket = socketIo('http://localhost:3200');
        this.socket.on('data', (res) => {
            console.log(res);
            this.observer.next(res);
        });
        return this.createObservable(this.observer);
    }

    sendData(d: Sketch): void {
        this.socket.emit('data', d);
    }

    sendMessage(m: FormControl): void {
        this.socket.emit('message', m.value);
    }

    getMessages(): Observable<string> {
        this.socket = socketIo('http://localhost:3200');
        this.socket.on('message', m => {
            console.log(m);
            this.message.next(m);
        });
        return this.createObservable(this.message);
    }

    createObservable(obs): Observable<any> {
        return new Observable(observer => {
            obs = observer;
        });
    }
}
