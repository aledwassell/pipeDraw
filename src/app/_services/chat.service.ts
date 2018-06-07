import { Injectable } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { Subject } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>this.wsService
        .connect();
  }

  sendMessage(msg) {
    this.messages.next(msg);
  }
}
