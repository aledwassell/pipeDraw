import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebsocketService} from "../../_services/websocket.service"
import {FormControl, FormGroup,  ReactiveFormsModule} from '@angular/forms';
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-chat',
    template: `
        <form class="form" [formGroup]="messagesForm" (keydown)="keyDownEnter($event)">
            <mat-form-field class="input-width">
                <input matInput formControlName="message" placeholder="Chat">
                <mat-icon (click)="sendMessage()" matSuffix>send</mat-icon>
            </mat-form-field>
        </form>
        <div class="message-box" *ngIf="messages.length > 0">
            <p *ngFor="let m of messages">{{m}}</p>
        </div>
    `,
    styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {
    messageSubscription: Subscription;
    messagesForm = new FormGroup ({
        message: new FormControl()
    });
    messages = [];

    constructor(private dataService: WebsocketService) {
    }

    ngOnInit() {
        this.messageSubscription = this.dataService.getMessages()
            .subscribe(
                m => {
                    if (this.messagesForm.value) {
                        this.messagesForm.reset();
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
        this.dataService.sendMessage(this.messagesForm.value.message);
    }

    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
    }
}
