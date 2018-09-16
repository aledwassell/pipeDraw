import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { WebsocketService } from "./_services/websocket.service";
import { FirebaseObjectObservable} from "@angular/fire/database-deprecated";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    items: FirebaseObjectObservable<any[]>;
  constructor(
      public snackBar: MatSnackBar,
      private webSocket: WebsocketService
  ) {
  }
    openSnackBar(message: string) {
        this.snackBar.open(message, null, {
            duration: 2000,
        });
    }
  ngOnInit() {
    this.webSocket.getMessages()
        .subscribe(
            m => {
              this.openSnackBar(`New message: ${m.message}`);
            }
        );
  }
}
