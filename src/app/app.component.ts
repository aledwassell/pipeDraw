import { Component, OnInit } from '@angular/core';
import {MineService} from "./_services/mine.service";
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello';
  serverUrl: 'http://localhost:5000/';
  constructor(private mine: MineService) {}
  ngOnInit(): void {
    const socket = socketIo(this.serverUrl);
    this.mine.listen();
    socket.on('hello', (data) => console.log(data));
  }
}
