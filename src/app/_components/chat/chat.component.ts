import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from "../../_services/websocket.service"
import { FormControl } from '@angular/forms';
import {Sketch} from "../../_interfaces/sketch"
import { Subscription } from "rxjs/index"

@Component({
  selector: 'app-chat',
  template: `
      <input [formControl]="message">
      <button (click)="sendMessage()">send</button>
      <div *ngIf="messages">
          <p *ngFor="let m of messages">{{m}}</p>
      </div>
  `,
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
    data: Sketch;
    dataSubscription: Subscription;
    messageSubscription: Subscription;
    message = new FormControl;
    messages: Array<string>;

    constructor(private dataService: WebsocketService) { }

    ngOnInit() {
        this.dataSubscription = this.dataService.getData()
            .subscribe(d => {
                this.data = d;
            });

        this.messageSubscription = this.dataService.messages()
            .subscribe(
                  m => console.log(m)
            );
    }

    sendMessage(): void {
        this.dataService.sendMessage(this.message);
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }
}
