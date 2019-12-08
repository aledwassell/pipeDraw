import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { WebsocketService } from '../model/websocket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    messages = [];
    private message: string = '';
    private clear = new Subject();

    constructor(private dataService: WebsocketService) { }

    ngOnInit() {
        this.dataService.messageSocket
            .asObservable()
            .pipe(takeUntil(this.clear))
            .subscribe(
                m => {
                    if (this.message) {
                        this.message = '';
                    }
                    this.messages.push(m.chatMsg);
                }
            );
    }

    keyDownEnter(event) {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage(): void {
        this.dataService.messageSocket.next({chatMsg: this.message});;
    }

    ngOnDestroy() {
        this.clear.next();
    }
}
