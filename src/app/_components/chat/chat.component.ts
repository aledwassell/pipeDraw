import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from "../../_services/websocket.service"
import { FormControl, FormGroup } from '@angular/forms';
import { Pen } from "../../_interfaces/pen"
import { Subscription } from "rxjs/index"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  name = new FormControl();
  stockQuote: Pen;
  message: Pen;
  sub: Subscription;
  constructor(private webSocket: WebsocketService) { }
  sendData(msg) {
    this.webSocket.sendData(msg);
  }
    ngOnInit() {
        this.webSocket.message.subscribe(msg => {
          console.log(msg);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
