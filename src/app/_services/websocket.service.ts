import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, observable, Observer, Subject} from "rxjs";
import { Sketch } from "../_interfaces/sketch";
import { Color } from "../_interfaces/color";
import { FormControl } from "@angular/forms"
import {Socket} from "../_interfaces/socket";
import {ColorGenService} from "./color-gen.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseListObservable, FirebaseObjectObservable} from "@angular/fire/database-deprecated";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private sketch: FirebaseObjectObservable<any>;
    public sketchData: Observable<any>;
    private url = 'http://localhost:3200';
    private drawSocket: Socket;
    private drawObserver: Observer<any>;
    private socket: Socket;
    private observer: Observer<any>;

    constructor(private db: AngularFireDatabase) {
        this.sketch = db.object('sketch').valueChanges();
        this.sketch.subscribe(
            d => this.sketchData = d
        );
    }

    getSketchData(): Observable<any> {
        return this.sketchData;
    }

    emitDrawData(d: Sketch): void {
        this.db.object('sketch').update(d);
    }

    emitMessage(m: FormControl): void {
        console.log(m);
        this.db.object('messages').update({message: m});
    }

    emitColorChange(c: Color): void {
        this.db.object('sketch').update(c);
    }

    emitBrushSizeChange(d: object): void {
        this.db.object('sketch').update(d);
    }
}
