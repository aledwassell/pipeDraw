import { Component, OnInit } from '@angular/core';
import {Observable } from "rxjs/index"
import { FormControl } from "@angular/forms"
import { WebsocketService } from "../../_services/websocket.service";

@Component({
  selector: 'app-toolbar',
  template: `
    <app-chat></app-chat>
  `,
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private webSocket: WebsocketService) { }

  ngOnInit() {
  }

}
