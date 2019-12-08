import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export interface Message {
  chatMsg?: string;
  x?: string;
  y?: string;
  color?: string;
}

// If running in dev environment use port 8080 where the server will be running for websocket and other requests.
const PORT = window.location.hostname === 'localhost' ? '8080' : location.port;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private scheme = window.location.protocol === "https:" ? 'wss://' : 'ws://';
  private webSocketUri = `${this.scheme}${window.location.hostname}${location.port ? `:${PORT}` : ''}/ws`;
  messageSocket: WebSocketSubject<Message> = webSocket(this.webSocketUri);
}
