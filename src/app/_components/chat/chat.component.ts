import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from "../../_services/websocket.service"
import { FormControl, FormGroup } from '@angular/forms';
import {Pen, Sketch} from "../../_interfaces/sketch"
import { Subscription } from "rxjs/index"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
    data: Sketch;
    sub: Subscription;

    constructor(private dataService: WebsocketService) { }

    ngOnInit() {
        this.sub = this.dataService.getData()
            .subscribe(d => {
                this.data = d;
            });
    }

    sendData(): void {
      this.dataService.sendData({x: 30, y: 30});
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
