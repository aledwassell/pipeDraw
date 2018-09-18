import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Observable} from "rxjs";
import {WebsocketService} from "./_services/websocket.service";
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    sketch: Observable<any[]>;
    tog: boolean = false;

    constructor(
        private db: AngularFirestore,
        public snackBar: MatSnackBar,
        private webSocket: WebsocketService
    ) {
        this.sketch = db.collection('sketch').valueChanges();
    }
    update() {
        if (this.tog) {
            this.db.collection('sketch').doc('1').update({color: '#ff0000', x: 23, y: 47});
        } else if (!this.tog) {
            this.db.collection('sketch').doc('1').update({color: '#000000', x: 0, y: 0});
        }
        this.tog = !this.tog;
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
