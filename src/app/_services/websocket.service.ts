import {Injectable, OnInit} from '@angular/core';
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
    _messages: string;
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

    messages(): Observable<string> {
        this.socket = socketIo('http://localhost:3200');
        this.socket.on('message', (res) => {
            this._messages = res;
        });
        return this._messages;
    }

    createObservable(obs): Observable<any> {
        return new Observable(observer => {
            obs = observer;
        });
    }
}
