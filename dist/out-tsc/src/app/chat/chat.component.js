import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ChatComponent = class ChatComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.messages = [];
        this.message = '';
    }
    ngOnInit() {
        this.messageSubscription = this.dataService.messageSocket.asObservable()
            .subscribe(m => {
            if (this.message) {
                this.message = '';
            }
            this.messages.push(m.message);
        });
    }
    keyDownEnter(event) {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }
    sendMessage() {
        this.dataService.postMessage(this.message);
    }
    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
    }
};
ChatComponent = tslib_1.__decorate([
    Component({
        selector: 'app-chat',
        templateUrl: './chat.component.html',
        styleUrls: ['./chat.component.scss']
    })
], ChatComponent);
export { ChatComponent };
//# sourceMappingURL=chat.component.js.map