import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebsocketService} from "../../_services/websocket.service"
import {FormControl, FormGroup,  ReactiveFormsModule} from '@angular/forms';
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-chat',
    template: `
        <form [formGroup]="messagesForm" (keydown)="keyDownEnter($event)">
            <section>
                <mat-form-field>
                    <input matInput required formControlName="message" placeholder="Your name">
                </mat-form-field>
                <button [disabled]="messagesForm.invalid" mat-raised-button (click)="sendMessage()">send</button>
            </section>
            <section>
                <mat-form-field>
                    <input matInput required formControlName="message" placeholder="Chat">
                </mat-form-field>
                <button [disabled]="messagesForm.invalid" mat-raised-button (click)="sendMessage()">send</button>
            </section>
            
        </form>
        <ul *ngIf="messages">
            <li *ngFor="let m of messages">{{m}}</li>
        </ul>
    `,
    styleUrls: ['./chat.component.css']
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
