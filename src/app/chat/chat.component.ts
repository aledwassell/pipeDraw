import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import {WebsocketService} from '../model/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageSubscription: Subscription;
  messages = [];
  message: string = '';

  constructor(private dataService: WebsocketService) {
  }

  ngOnInit() {
      this.messageSubscription = this.dataService.messageSocket.asObservable()
          .subscribe(
              m => {
                  if (this.message) {
                      this.message = '';
                  }
                  this.messages.push(m.message);
              }
          );
  }

  keyDownEnter(event) {
      if (event.keyCode === 13) {
          this.sendMessage();
      }
  }

  sendMessage(): void {
      this.dataService.postMessage(this.message);
  }

  ngOnDestroy() {
      this.messageSubscription.unsubscribe();
  }
}
