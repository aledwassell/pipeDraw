import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable, observable, Observer, Subject} from "rxjs";
import { Sketch } from "../_interfaces/sketch";
import { Color } from "../_interfaces/color"
import * as io from 'socket.io-client';
import { FormControl } from "@angular/forms"
import {Socket} from "../_interfaces/socket";
import {ColorGenService} from "./color-gen.service"

export interface Item { name: string; }

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    public items;
    private url = 'http://localhost:3200';
    private drawSocket: Socket;
    private drawObserver: Observer<any>;
    private socket: Socket;
    private observer: Observer<any>;
    private _rainbowize: boolean = false;

    constructor(db: AngularFireDatabase) {
        this.items = db.list('/todos');
        console.log(this.items);
    }

    rainbowize () {
        this._rainbowize = !this._rainbowize;
        console.log(this.items);
    }

    emitDrawData(d: Sketch): void {
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

    emitMessage(m: FormControl): Observable<FormControl> {
        return this.socket.emit('message', m);
    }

    emitColorChange(c: Color): void {
        this.socket.emit('color', c);
    }

    emitBrushSizeChange(d: number): void {
        this.socket.emit('brushSize', d);
    }
    getBrushSize(): Observable<number> {
        let observable = new Observable<number>(observer => {
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
