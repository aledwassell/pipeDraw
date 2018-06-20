import { Injectable } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { Pen } from "../_interfaces/pen"
import {Observable, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  message: Subject<Pen>
  constructor(private socketServe: WebsocketService) {
    this.message = <Subject<Pen>>socketServe.connect();
  }
}
