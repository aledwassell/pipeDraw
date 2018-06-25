import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebsocketService} from "../../_services/websocket.service"
import {FormControl} from '@angular/forms';
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-chat',
    template: `
        <form (keydown)="keyDownEnter($event)">
            <mat-form-field>
                <input matInput placeholder="Chat">
                <button mat-raised-button (click)="sendMessage()">send</button>
            </mat-form-field>
        </form>
        <div *ngIf="messages">
            <p *ngFor="let m of messages">{{m}}</p>
        </div>
    `,
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
    messageSubscription: Subscription;
    message = new FormControl;
    messages = [];

    constructor(private dataService: WebsocketService) {
    }

    ngOnInit() {
        this.messageSubscription = this.dataService.getMessages()
            .subscribe(
                m => this.messages.push(m.message)
            );
    }

    keyDownEnter(event) {
        if (event.keyCode === 13) {
            this.dataService.sendMessage(this.message);
            this.message.reset();
        }
    }

    sendMessage(): void {
        this.dataService.sendMessage(this.message);
        this.message.reset();
    }

    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
    }
}
