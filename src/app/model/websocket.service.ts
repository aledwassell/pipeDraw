import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private scheme = window.location.protocol === "https:" ? 'wss://' : 'ws://';
  private webSocketUri = `${this.scheme}${window.location.hostname}${location.port ? ':'+location.port: ''}/ws`;
  messageSocket: WebSocketSubject<Message> = webSocket(this.webSocketUri);
  constructor() {
  }
  postMessage(text: string){
    if(text != ''){
      this.messageSocket.next({message: text});
    }
  }
}
