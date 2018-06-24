import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../_services/websocket.service";
import { Sketch } from "../../_interfaces/sketch"
import {BehaviorSubject, Observable, Observer, Subscription, Subject} from "rxjs/index"
import * as P5 from 'p5';

@Component({
  selector: 'app-canvas',
  template: `
      {{data | json}}
      {{p5.mouseX | json}}
      {{p5.mouseY | json}}
      {{p5.mouseDown | json}}
      <div id="canvas"></div>
  `,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  sub: Subscription;
  data: Sketch;
  p5: any;
  drawObservable = new Observable<Sketch>((obs) => {
      this.p5.mouseDragged = () => {
          this.p5.fill(0);
          this.p5.noStroke();
          this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, 10, 10);
          obs.next({x: this.p5.mouseX, y: this.p5.mouseY});
      };
  })
  constructor(private webSocket: WebsocketService) { }

    ngOnInit() {
        this.createCanvas();
        this.sub = this.webSocket.getDrawData()
            .subscribe(
                data => {
                    this.data = data;
                }
            );
        this.drawObservable.subscribe(
            (e) => {
                this.webSocket.sendDrawData(e);
            }
        );
    }

    private createCanvas() {
        this.p5 = new P5(this.sketch);
    }

    private sketch(p: any) {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas');
          p.background(255);
        };
    }
}
