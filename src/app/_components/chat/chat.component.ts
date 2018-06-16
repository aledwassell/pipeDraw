import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../_services/chat.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private chat: ChatService) { }

  name = new FormControl();

  message: string;

  ngOnInit() {
    // this.chat.messages.subscribe(message => {
    //   this.message = message.text;
    // });
  }
  sendMessage(msg) {
    this.chat.sendMessage(msg);
  }
}
