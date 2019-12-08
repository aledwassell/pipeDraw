import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
let WebsocketService = class WebsocketService {
    constructor() {
        this.scheme = window.location.protocol === "https:" ? 'wss://' : 'ws://';
        // private webSocketUri = `${this.scheme}${window.location.hostname}${location.port ? `:${location.port}` : ''}/ws`;
        this.webSocketUri = `ws://localhost:8080/ws`;
        this.messageSocket = webSocket(this.webSocketUri);
        console.log(this.scheme);
    }
    postMessage(text) {
        if (text != '') {
            this.messageSocket.next({ message: text });
        }
    }
};
WebsocketService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], WebsocketService);
export { WebsocketService };
//# sourceMappingURL=websocket.service.js.map