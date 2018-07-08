import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../_services/websocket.service";
import { ColorGenService } from "../../_services/color-gen.service"
import { Sketch } from "../../_interfaces/sketch";
import { Color } from "../../_interfaces/color"
import {Observable, Subscription} from "rxjs/index"
import * as P5 from 'p5';

@Component({
  selector: 'app-canvas',
  template: `      
      <div id="canvas"></div>
  `,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  sub: Subscription;
  data: Sketch;
  color: Color = {color: '#333333', type: 'pen'};
  background: Color = {color: '#ffffff', type: 'canvas'}
  p5: any;
  drawObservable = new Observable<Sketch>((obs) => {
      this.p5.mouseDragged = () => {
          this.p5.fill(this.color.color);
          this.p5.noStroke();
          this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, 10, 10);
          obs.next({x: this.p5.mouseX, y: this.p5.mouseY});
      };
      obs.complete();
  });
  constructor(
      private webSocket: WebsocketService
  ) { }
    ngOnInit() {
        this.createCanvas();
        this.sub = this.webSocket.getDrawData()
            .subscribe(
                data => {
                    this.data = data;
                    this.draw(data);
                }
            );
        this.drawObservable.subscribe(
            (e) => {
                this.webSocket.sendDrawData(e);
            }
        );
        this.webSocket.getColor()
            .subscribe(
                c => {
                    if (c.type === 'pen') {
                        this.color = c;
                    } else if (c.type === 'canvas') {
                        this.background = c;
                    }
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
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    }

    private draw(data: Sketch) {
      console.log(data)
      this.p5.draw = () => {
          this.p5.fill(0);
          this.p5.noStroke();
          this.p5.ellipse(data.x, data.y, 10, 10);
      };
    }
}
