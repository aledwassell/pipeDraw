import {Injectable, OnInit} from '@angular/core';
import {Observable, observable, Observer, Subject} from "rxjs";
import { Sketch } from "../_interfaces/sketch";
import { Color } from "../_interfaces/color"
import * as io from 'socket.io-client';
import { FormControl } from "@angular/forms"
import {Socket} from "../_interfaces/socket";
import { BrushSize } from "../_interfaces/brushSize"

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
        return this.socket.emit('message', m);
    }

    colorChange(c: Color): void {
        this.socket.emit("color", c);
    }

    brushSizeChange(d: BrushSize): void {
        console.log(d);
        this.socket.emit('brushSize', d);
    }
    getBrushSize(): Observable<Color> {
        let observable = new Observable<Color>(observer => {
            this.socket = io(this.url);
            this.socket.on('brushSize', data => {
                observer.next(data);
            });
            return;
        });
        return observable;
    }
    getColor(): Observable<Color> {
        let observable = new Observable<Color>(observer => {
            this.socket = io(this.url);
            this.socket.on('color', data => {
                observer.next(data);
            });
            return;
        });
        return observable;
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
