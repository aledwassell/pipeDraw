import {Injectable} from '@angular/core';
import {Observable, observable, Observer, Subject} from "rxjs";
import {map, catchError} from "rxjs/internal/operators";
import {Pen} from "../_interfaces/pen"
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
    observer: Observer<Pen>;
    message: Subject<any>;

    constructor() {
    }

    createObservable(): Observable<Pen> {
        return new Observable<Pen>(observer => {
            this.observer = observer;
        });
    }

    // getData(): Observable<Pen> {
    //   this.socket = socketIo('http://localhost:3200');
    //   this.socket.on('data', (res) => {
    //     this.observer.next(res.data);
    //   });
    //   return this.createObservable();
    // }

    connect(): Subject<Socket> {
        this.socket = socketIo('http://localhost:3200');
        let observable = this.createObservable();
        let observer = {
            next: (data: Object) => {
                console.log(data);
                this.socket.emit('message', JSON.stringify(data))
            }
        };
        return Subject.create(observer, observable);

    }

    sendData(msg) {
        this.message.next(msg);
    }


    private handleError(e) {
        console.error(`There was an error:${e}`);
        if (e.error instanceof Error) {
            let errorMsg = e.error.message;
            return Observable.throw(errorMsg);
        }
        return Observable.throw(e || `Socket.io server error`);
    }
}
