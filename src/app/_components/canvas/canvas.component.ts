import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../_services/websocket.service";
import { Sketch } from "../../_interfaces/sketch"
import { Subscription } from "rxjs/index"
import * as P5 from 'p5';

@Component({
  selector: 'app-canvas',
  template: `
      {{brush | json}}
      <div id="canvas"></div>
  `,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  brush: Sketch;
  sub: Subscription;
  p5: any;
  constructor(private webSocket: WebsocketService) { }

    ngOnInit() {
        this.createCanvas();
        this.sub = this.webSocket.getDrawData()
            .subscribe(
                data => this.brush = data
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

        p.mouseDragged = () => {
            p.fill(0);
            p.noStroke();
            // p.ellipse(p.mouseX, p.mouseY, 10, 10);
            p.ellipse(this.brush.x, this.brush.y, 10, 10);
        };

        p.draw = () => {
        };
    }
}
